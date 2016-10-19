import {Request, Response, NextFunction} from "express";
import {IPrincipal} from "../security/principal/principal";
import {Cache} from "../caching/cache";

export class HttpContext {
  user: IPrincipal | null;
  cache: Cache;

  constructor(private req: Request, private res: Response, private nxt: NextFunction) {
  }

  get request(): Request {
    return this.req;
  }

  get response(): Response {
    return this.res;
  }

  get next(): NextFunction {
    return this.nxt;
  }
}
