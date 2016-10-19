import {Request} from "express";
import {HttpContext} from "../http/http-context";

export class HttpContextProvider {
  static HTTP_CONTEXT_KEY = '_easy-rest-context';

  static getContext(req: Request): HttpContext {
    let context: HttpContext = (<any>req)[HttpContextProvider.HTTP_CONTEXT_KEY];

    if (!context) {
      throw new Error(`Http context is not available. Perhaps it wasn't yet initialized`);
    }

    return context;
  }

  static setContext(req: Request, httpContext: HttpContext): void {
    (<any>req)[HttpContextProvider.HTTP_CONTEXT_KEY] = httpContext;
  }
}
