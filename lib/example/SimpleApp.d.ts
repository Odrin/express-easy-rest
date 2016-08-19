import { Request, Response } from "express";
import { ApplicationInstance } from "../easy-rest/core/application-instance";
import { Promise } from "es6-promise";
export declare class SimpleApp extends ApplicationInstance {
    constructor();
    simpleHandler(req: Request, res: Response): Promise<void>;
    simpleErrorHandler1(err: any, req: Request, res: Response): Promise<any>;
    simpleErrorHandler2(err: any, req: Request, res: Response): Promise<any>;
    private getAuthProvider();
}
