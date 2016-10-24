/// <reference types="express" />
import { Request, Response, NextFunction } from "express";
import { IPrincipal } from "../security/principal/principal";
import { Cache } from "../caching/cache";
export declare class HttpContext {
    private req;
    private res;
    private nxt;
    user: IPrincipal | null;
    cache: Cache;
    constructor(req: Request, res: Response, nxt: NextFunction);
    readonly request: Request;
    readonly response: Response;
    readonly next: NextFunction;
}
