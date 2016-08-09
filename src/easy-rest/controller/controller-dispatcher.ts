import * as express from "express";
import {Promise} from "es6-promise";
import {EasyRestConfig} from "../core/easy-rest-config";
import {IControllerConstructor} from "../core/controller";
import {IParameterBindingOptions} from "../decorators/binding/parameter-binding-options";
import {DataBinder} from "./data-binder";
import {IActionResult} from "./action-result/action-result";
import {ResponseMessage} from "./action-result/response-message";

export class ControllerDispatcher {
  constructor(private configurator: EasyRestConfig,
              private controllerConctructor: IControllerConstructor,
              private action: string,
              private bindings: IParameterBindingOptions[],
              private returnType: any) {

    if (controllerConctructor.prototype[action].length !== bindings.length) {
      throw new Error(`Binding configuration error: ${action}`);
    }
  }

  handleRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      let instance = this.instantiateController(req, res, next);
      let action = <Function>(<any>instance)[this.action];
      let parameters = new DataBinder(req, this.bindings).getParameters();

      let result = action.apply(instance, parameters);

      this.handleResult(result) //this.returnType
        .then((message: ResponseMessage) => {
          res.status(message.statusCode);

          if (message.data) {
            res.json(message.data);
          }
          else {
            res.send();
          }

          next();
        })
        .catch((error) => {
          res.status(500);
          next(error);
        });
    }
    catch (error) {
      res.status(500);
      next(error);
    }
  };

  private handleResult(result: IActionResult | ResponseMessage | Promise<any> | any): Promise<ResponseMessage> {
    if (result instanceof Promise) {
      return this.handlePromiseResult(result);
    }

    if (this.isActionResult(result)) {
      return this.handleActionResult(result);
    }

    if (result instanceof ResponseMessage) {
      return this.handleResponseMessageResult(result);
    }

    return Promise.resolve<ResponseMessage>(new ResponseMessage(result));
  }

  private isActionResult(object: any): object is IActionResult {
    return 'executeAsync' in object;
  }

  private handlePromiseResult(result: Promise<any>): Promise<ResponseMessage> {
    if (!result) {
      throw new Error(`Action return type error. Expected: Promise, got: ${result}`);
    }

    return result.then((data: any) => this.handleResult(data));
  }

  private handleActionResult(result: IActionResult): Promise<ResponseMessage> {
    if (!result) {
      throw new Error(`Action return type error. Expected: IActionResult, got: ${result}`);
    }

    return result.executeAsync();
  }

  private handleResponseMessageResult(result: ResponseMessage): Promise<ResponseMessage> {
    if (!result) {
      throw new Error(`Action return type error. Expected: ResponseMessage, got: ${result}`);
    }

    return Promise.resolve(result);
  }

  private instantiateController(req: express.Request, res: express.Response, next: express.NextFunction) {
    var instance = new this.controllerConctructor();

    instance._req = req;
    instance._res = res;

    return instance;
  }
}
