import { Request, Response } from "express";
import { ApplicationInstance } from "../index";
import { HttpContext } from "../easy-rest/http/http-context";
export declare class SimpleApp extends ApplicationInstance {
    constructor();
    onError(error: any, httpContext: HttpContext): void;
    simpleHandler(req: Request, res: Response): Promise<void>;
    private getAuthProvider();
}
