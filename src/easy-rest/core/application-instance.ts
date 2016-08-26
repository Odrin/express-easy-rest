import * as express from "express";
import * as bodyParser from "body-parser";
import {IControllerConstructor} from "../api/api-controller";
import {IControllerOptions} from "../decorators/controller/controller-options";
import {
  CONTROLLER_OPTIONS_METADATA_KEY,
  ACTION_DECLARATION_METADATA_KEY,
  ACTION_OPTIONS_METADATA_KEY
} from "../metadata/metadata-keys";
import {IActionOptions} from "../decorators/action/action-options";
import {PathBuilder} from "../util/path-builder";
import {ControllerDispatcher} from "../api/controller-dispatcher";
import {IRequestHandler} from "../handlers/request-handler";
import {IErrorRequestHandler} from "../handlers/error-request-handler";
import {Metadata} from "../metadata/metadata";
import {IAuthenticationProvider} from "../security/authentication/authentication-provider";
import {DefaultAuthenticationProvider} from "../security/authentication/default-authentication-provider";
import {HttpContextProvider} from "../util/http-context-provider";
import {AuthorizationFilter} from "../security/authorization/authorization-filter";
import {HttpContext} from "../http/http-context";
import {Cache} from "../caching/cache";

export abstract class ApplicationInstance {
  private express: express.Express = express();

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

  authenticationProvider: IAuthenticationProvider = new DefaultAuthenticationProvider();

  constructor() {

  }

  middleware(): express.Express {
    this.initializeContext();
    this.configHandlers();
    this.configParsers();
    this.configAuthProvider();
    this.configRouter();
    this.configErrorHandlers();

    return this.express;
  }

  /**
   * Override to use custom auth filter
   * @return {AuthorizationFilter}
   */
  getAuthorizationFilter() {
    return new AuthorizationFilter();
  }

  private initializeContext() {
    //TODO: fix
    //noinspection TypeScriptValidateTypes
    this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      let httpContext = new HttpContext(req, res, next);
      httpContext.cache = Cache.instance;

      HttpContextProvider.setContext(req, httpContext);

      next();
    });
  }

  private configAuthProvider() {
    //TODO: fix
    //noinspection TypeScriptValidateTypes
    this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (!this.authenticationProvider) {
        return next();
      }

      this.authenticationProvider.onAuthentication(req, res)
        .then((principal) => {
          let context = HttpContextProvider.getContext(req);
          context.user = principal || null;
          next();
        })
        .catch((error) => next(error));
    });
  }

  private configParsers() {
    if (this.parsers.length !== 0) {
      //TODO: fix
      //noinspection TypeScriptValidateTypes
      this.express.use(this.parsers);
    }
  }

  private configHandlers() {
    //TODO: fix
    //noinspection TypeScriptValidateTypes
    this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (this.requestHandlers.length === 0) {
        return next();
      }

      try {
        let promise: Promise<void> = Promise.resolve();

        for (let i = 0; i < this.requestHandlers.length; i++) {
          let handler = this.requestHandlers[i];

          promise = promise.then(() => handler(req, res));
        }

        promise
          .then(() => next())
          .catch((error) => next(error));
      }
      catch (error) {
        next(error);
      }
    });
  }

  private configErrorHandlers() {
    //TODO: fix
    //noinspection TypeScriptValidateTypes
    this.express.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (this.errorHandlers.length === 0) {
        return next(err);
      }

      try {
        let promise: Promise<void> = Promise.resolve(err);

        for (let i = 0; i < this.errorHandlers.length; i++) {
          let handler = this.errorHandlers[i];

          promise.then((error) => handler(error, req, res));
        }

        promise
          .then((error) => next(error))
          .catch((error) => next());
      }
      catch (error) {
        next(error);
      }
    });
  }

  private configRouter() {
    for (let controller of this.controllers) {
      let ctrlOptions = Metadata.get<IControllerOptions>(CONTROLLER_OPTIONS_METADATA_KEY, controller) || {}; //TODO: Controller options defaults
      let actions = Metadata.get<string[]>(ACTION_DECLARATION_METADATA_KEY, controller.prototype);

      for (let action of actions) {
        let methodOptions = Metadata.get<IActionOptions>(ACTION_OPTIONS_METADATA_KEY, controller.prototype, action);

        if (ctrlOptions.basePath && typeof (methodOptions.path) !== 'string') {
          throw new Error(`ApiController string basePath incompatible with ApiMethod RegExp path. ${(<any>controller)['name']}:${action}`);
        }

        let path = PathBuilder.build(ctrlOptions.basePath, methodOptions.path, action);
        let dispatcher = new ControllerDispatcher(this, controller, action);

        (<any>this.express)[methodOptions.method](path, dispatcher.handleRequest);
      }
    }
  }
}
