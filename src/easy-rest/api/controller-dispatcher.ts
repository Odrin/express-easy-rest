import * as express from "express";
import {IControllerConstructor} from "./api-controller";
import {IParameterBindingOptions} from "../decorators/binding/parameter-binding-options";
import {DataBinder} from "./data-binder";
import {IActionResult} from "./action-result/action-result";
import {ResponseMessage} from "./action-result/response-message";
import {HttpContextProvider} from "../util/http-context-provider";
import {ApplicationInstance} from "../core/application-instance";
import {Metadata} from "../metadata/metadata";
import {
  ACTION_BINDINGS_METADATA_KEY,
  AUTH_ROLES_METADATA_KEY,
} from "../metadata/metadata-keys";
import {AuthorizationFilter} from "../security/authorization/authorization-filter";
import {HttpActionContext} from "../http/http-action-context";
import {HttpContext} from "../http/http-context";
import {HttpControllerDescriptor} from "../http/http-controller-descriptor";
import {Request} from "express";
import {HttpActionDescriptor} from "../http/http-action-descriptor";
import {HttpError} from "../exceptions/api-error";

export class ControllerDispatcher {
  private bindings: IParameterBindingOptions[];
  private authorizationFilter: AuthorizationFilter;
  private returnType: any;

  constructor(private instance: ApplicationInstance,
              private controller: IControllerConstructor,
              private action: string) {

    this.returnType = Metadata.getReturnType(controller.prototype, action);
    this.bindings = Metadata.get<IParameterBindingOptions[]>(ACTION_BINDINGS_METADATA_KEY, controller.prototype, action) || [];

    if (controller.prototype[action].length !== this.bindings.length) {
      throw new Error(`Binding configuration error: ${action}`);
    }

    let controllerRoles = Metadata.get(AUTH_ROLES_METADATA_KEY, controller);
    let actionRoles = Metadata.get(AUTH_ROLES_METADATA_KEY, controller.prototype, action);

    if (controllerRoles || actionRoles) {
      let roles = []
        .concat(controllerRoles || [])
        .concat(actionRoles || [])
        .filter((value, index, array) => array.indexOf(value) === index);

      this.authorizationFilter = instance.getAuthorizationFilter();
      this.authorizationFilter.roles = roles;
    }
  }

  handleRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      let actionContext = this.getActionContext(req);

      if (this.authorizationFilter && !this.authorizationFilter.onAuthorization(actionContext)) {
        return next();
      }

      let instance = this.instantiateController(actionContext);
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
      if (error instanceof HttpError) {
        res.status(error.getStatus());
        res.json(error.getMessage());
        next(error);
      }
      else {
        res.status(500);
        next(error);
      }
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
    return typeof (object) === 'object' && 'executeAsync' in object;
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

  private instantiateController(context: HttpActionContext) {
    var instance = new this.controller();

    instance._context = context;

    return instance;
  }

  private getActionContext(req: Request): HttpActionContext {
    let httpContext = this.getHttpContext(req);
    let controllerDiscriptor = new HttpControllerDescriptor();
    let actionDescriptor = new HttpActionDescriptor();

    controllerDiscriptor.controller = this.controller;
    controllerDiscriptor.controllerName = (<any>this.controller)['name']; //TODO: ES6 "name" field

    actionDescriptor.actionName = this.action;
    actionDescriptor.bindings = this.bindings;
    actionDescriptor.returnType = this.returnType;

    return new HttpActionContext(httpContext, controllerDiscriptor, actionDescriptor);
  }

  private getHttpContext(req: Request): HttpContext {
    return HttpContextProvider.getContext(req);
  }
}
