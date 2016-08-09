import * as express from "express";
import * as bodyParser from "body-parser";
import {ApplicationInstance} from "./application-instance";
import {IControllerConstructor} from "./controller";
import {IControllerOptions} from "../decorators/controller/controller-options";
import {
  CONTROLLER_OPTIONS_METADATA_KEY, ACTION_DECLARATION_METADATA_KEY,
  ACTION_OPTIONS_METADATA_KEY, ACTION_BINDINGS_METADATA_KEY
} from "../metadata/metadata-keys";
import {IActionOptions} from "../decorators/action/action-options";
import {IParameterBindingOptions} from "../decorators/binding/parameter-binding-options";
import {PathBuilder} from "../util/path-builder";
import {ControllerDispatcher} from "../controller/controller-dispatcher";
import {IRequestHandler} from "../handlers/request-handler";
import {IErrorRequestHandler} from "../handlers/error-request-handler";
import {Metadata} from "../metadata/metadata";

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
   * Array of request request handlers that will be called before request routing
   */
  requestHandlers: IRequestHandler[] = [];
  /**
   * Array of global api application error request handlers
   */
  errorHandlers: IErrorRequestHandler[] = [];
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
    this.configRouter();
    this.configErrorHandlers();

    return this.express;
  }

  private configHandlers() {
    //TODO: fix
    //noinspection TypeScriptValidateTypes
    this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        for (let i = 0; i < this.requestHandlers.length; i++) {
          let handler = this.requestHandlers[i];

          if (!handler(req, res)) {
            return;
          }
        }

        next();
      }
      catch (error) {
        next(error);
      }
    });
  }

  private configParsers() {
    if (this.parsers.length !== 0) {
      //noinspection TypeScriptValidateTypes
      this.express.use(this.parsers);
    }
  }

  private configErrorHandlers() {
    //TODO: fix
    //noinspection TypeScriptValidateTypes
    this.express.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        let error = err;
        for (let i = 0; i < this.errorHandlers.length; i++) {
          let handler = this.errorHandlers[i];
          error = handler(error, req, res);

          if (!error) {
            next();
            return;
          }
        }

        next(err);
      }
      catch (error) {
        next(error);
      }
    });
  }

  private configRouter() {
    for (let controller of this.controllers) {
      let ctrlOptions = Metadata.get<IControllerOptions>(CONTROLLER_OPTIONS_METADATA_KEY, controller) || {}; //TODO: controller options defaults
      let actions = Metadata.get<string[]>(ACTION_DECLARATION_METADATA_KEY, controller.prototype);

      for (let action of actions) {
        let methodOptions = Metadata.get<IActionOptions>(ACTION_OPTIONS_METADATA_KEY, controller.prototype, action);
        let bindings = Metadata.get<IParameterBindingOptions[]>(ACTION_BINDINGS_METADATA_KEY, controller.prototype, action) || [];
        let returnType = Metadata.getReturnType(controller.prototype, action);

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
