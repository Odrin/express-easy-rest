import * as express from "express";
import * as bodyParser from "body-parser";
import {IControllerOptions} from "../decorators/controller/controller-options";
import {
  CONTROLLER_OPTIONS_METADATA_KEY,
  ACTION_DECLARATION_METADATA_KEY,
  ACTION_OPTIONS_METADATA_KEY
} from "../metadata/metadata-keys";
import {IActionOptions} from "../decorators/action/action-options";
import {PathBuilder} from "../util/path-builder";
import {ControllerDispatcher} from "../api/controller-dispatcher";
import {Metadata} from "../metadata/metadata";
import {IAuthenticationProvider} from "../security/authentication/authentication-provider";
import {DefaultAuthenticationProvider} from "../security/authentication/default-authentication-provider";
import {HttpContextProvider} from "../util/http-context-provider";
import {AuthorizationFilter} from "../security/authorization/authorization-filter";
import {HttpContext} from "../http/http-context";
import {Cache} from "../caching/cache";
import {ModuleLoader} from "./module-loader";

export abstract class ApplicationInstance {
  private express: express.Express = express();

  /**
   * Path pattern to load controllers. Default: __dirname + /controllers/**&#47;*.js
   */
  controllersPathPattern: string = __dirname + '/controllers/**/*.js';

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
    this.loadModules();
    this.initializeContext();
    this.configRequestHandler();
    this.configParsers();
    this.configAuthProvider();
    this.configRouter();
    this.configErrorHandler();

    return this.express;
  }

  /**
   * Override to use custom auth filter
   * @return {AuthorizationFilter}
   */
  getAuthorizationFilter() {
    return new AuthorizationFilter();
  }

  /**
   * Override for custom global request handling.
   * Don't forget about next()
   * @param httpContext
   */
  onRequest(httpContext: HttpContext) {
    httpContext.next();
  }

  /**
   * Override for custom global error handling
   * Don't forget about next()
   * @param error
   * @param httpContext
   */
  onError(error: any, httpContext: HttpContext) {
    if (!httpContext.response.headersSent) {
      httpContext.response.status(500);
      httpContext.response.json(error);
    }

    httpContext.next(error);
  }

  private loadModules() {
    ModuleLoader.load(this.controllersPathPattern);
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

  private configRequestHandler() {
    //TODO: fix
    //noinspection TypeScriptValidateTypes
    this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        let httpContext = HttpContextProvider.getContext(req);

        this.onRequest(httpContext);
      }
      catch (error) {
        next(error);
      }
    });
  }

  private configErrorHandler() {
    //TODO: fix
    //noinspection TypeScriptValidateTypes
    this.express.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        let httpContext = HttpContextProvider.getContext(req);

        this.onError(err, httpContext);
      }
      catch (error) {
        next(error);
      }
    });
  }

  private configRouter() {
    let controllers = ModuleLoader.controllers;

    for (let controller of controllers) {
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
