import { Request, Response, NextFunction } from "express";
import { IPrincipal } from "../security/principal/principal";
export declare class HttpContext {
    private req;
    private res;
    private nxt;
    user: IPrincipal;
    constructor(req: Request, res: Response, nxt: NextFunction);
    request: Request;
    response: Response;
    next: NextFunction;
}
