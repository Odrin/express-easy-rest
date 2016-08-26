import { Request, Response, NextFunction } from "express";
import { IPrincipal } from "../security/principal/principal";
import { Cache } from "../caching/cache";
export declare class HttpContext {
    private req;
    private res;
    private nxt;
    user: IPrincipal;
    cache: Cache;
    constructor(req: Request, res: Response, nxt: NextFunction);
    request: Request;
    response: Response;
    next: NextFunction;
}
