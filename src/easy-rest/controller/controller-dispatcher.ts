import * as express from "express";
import {Promise} from "es6-promise";
import {IControllerConstructor} from "./controller";
import {IParameterBindingOptions} from "../decorators/binding/parameter-binding-options";
import {DataBinder} from "./data-binder";
import {IActionResult} from "./action-result/action-result";
import {ResponseMessage} from "./action-result/response-message";
import {ContextDataProvider} from "../util/context-data-provider";
import {IPrincipal} from "../security/principal/principal";
import {ApplicationInstance} from "../core/application-instance";
import {Metadata} from "../metadata/metadata";
import {
  ACTION_BINDINGS_METADATA_KEY, AUTH_ROLES_METADATA_KEY,
  AUTH_ANONYMOUS_METADATA_KEY
} from "../metadata/metadata-keys";
import {AuthorizationFilter} from "../security/authorization/authorization-filter";

export class ControllerDispatcher {
  private bindings: IParameterBindingOptions[];
  private authorizationFilter: AuthorizationFilter;

  constructor(private instance: ApplicationInstance,
              private controllerConctructor: IControllerConstructor,
              private action: string) {

    this.bindings = Metadata.get<IParameterBindingOptions[]>(ACTION_BINDINGS_METADATA_KEY, controllerConctructor.prototype, action) || [];

    if (controllerConctructor.prototype[action].length !== this.bindings.length) {
      throw new Error(`Binding configuration error: ${action}`);
    }

    //let returnType = Metadata.getReturnType(Controller.prototype, Action);
    let controllerRoles = Metadata.get(AUTH_ROLES_METADATA_KEY, controllerConctructor);
    let actionRoles = Metadata.get(AUTH_ROLES_METADATA_KEY, controllerConctructor.prototype, action);

    if (controllerRoles || actionRoles) {
      //TODO: HttpContext; ActionContext
      let allowAnonymous = Metadata.get(AUTH_ANONYMOUS_METADATA_KEY, controllerConctructor.prototype, action);

      if (!allowAnonymous) {
        let roles = []
          .concat(controllerRoles || [])
          .concat(actionRoles || [])
          .filter((value, index, array) => array.indexOf(value) === index);

        this.authorizationFilter = instance.getAuthorizationFilter();
        this.authorizationFilter.roles = roles;
      }
    }
  }

  handleRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      if (this.authorizationFilter && !this.authorizationFilter.onAuthorization(req, res)) {
        return next();
      }

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

    //TODO: wrap request object
    instance.requset = req;
    instance.user = ContextDataProvider.getData<IPrincipal>(req, 'principal');

    return instance;
  }
}
