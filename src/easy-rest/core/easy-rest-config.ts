import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import {ApplicationInstance} from "./application-instance";
import {IControllerConstructor} from "./controller";
import {IControllerOptions} from "../decorators/controller/controller-options";
import {
  CONTROLLER_OPTIONS_METADATA_KEY, ACTION_DECLARATION_METADATA_KEY,
  ACTION_OPTIONS_METADATA_KEY, ACTION_BINDINGS_METADATA_KEY
} from "../decorators/metadata-keys";
import {IActionOptions} from "../decorators/action/action-options";
import {IParameterBindingOptions} from "../decorators/binding/parameter-binding-options";
import {PathBuilder} from "../util/path-builder";
import {ControllerDispatcher} from "../controller/controller-dispatcher";

export class EasyRestConfig {
  static create(appCls: new () => ApplicationInstance): express.Express {
    return new EasyRestConfig(appCls).create();
  }

  private express: express.Express;
  private instance: ApplicationInstance;

  /**
   * Array of controllers used for routing
   */
  controllers: IControllerConstructor[] = [];
  /**
   * Array of request handlers that will be called before request routing
   */
  handlers: express.RequestHandler[] = [];
  /**
   * Array of global api application error handlers
   */
  errorHandlers: express.ErrorRequestHandler[] = [];
  /**
   * Array of body parsers. Default is single json body parser.
   * @see {@link http://expressjs.com/en/4x/api.html#req.body}
   * @see {@link https://github.com/expressjs/body-parser}
   */
  parsers: express.RequestHandler[] = [bodyParser.json()];

  constructor(Cls: new () => ApplicationInstance) {
    this.express = express();
    this.instance = new Cls();
  }

  private create() {
    this.instance.config(this);

    this.configHandlers();
    this.configParsers();
    this.configErrorHandlers();
    this.configRouter();

    return this.express;
  }

  private configHandlers() {
    if (this.handlers.length !== 0) {
      //noinspection TypeScriptValidateTypes
      this.express.use(this.handlers);
    }
  }

  private configParsers() {
    if (this.parsers.length !== 0) {
      //noinspection TypeScriptValidateTypes
      this.express.use(this.parsers);
    }
  }

  private configErrorHandlers() {
    if (this.errorHandlers.length !== 0) {
      //noinspection TypeScriptValidateTypes
      this.express.use(this.errorHandlers);
    }
  }

  private configRouter() {
    for (let controller of this.controllers) {
      let ctrlOptions = <IControllerOptions>Reflect.getMetadata(CONTROLLER_OPTIONS_METADATA_KEY, controller) || {}; //TODO: controller options defaults
      let actions = <string[]>Reflect.getMetadata(ACTION_DECLARATION_METADATA_KEY, controller.prototype);

      for (let action of actions) {
        let methodOptions = <IActionOptions>Reflect.getMetadata(ACTION_OPTIONS_METADATA_KEY, controller.prototype, action);
        let bindings = <IParameterBindingOptions[]>Reflect.getMetadata(ACTION_BINDINGS_METADATA_KEY, controller.prototype, action) || [];
        let returnType = Reflect.getMetadata('design:returntype', controller.prototype, action);

        if (ctrlOptions.basePath && typeof (methodOptions.path) !== 'string') {
          throw new Error(`ApiController string basePath incompatible with ApiMethod RegExp path. ${(<any>controller)['name']}:${action}`);
        }

        let path = PathBuilder.build(ctrlOptions.basePath, methodOptions.path, action);
        let dispatcher = new ControllerDispatcher(this, controller, action, bindings, returnType);

        (<any>this.express)[methodOptions.method](path, dispatcher.handleRequest);
      }
    }
  }
}
