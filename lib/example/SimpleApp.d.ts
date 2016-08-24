import { Request, Response } from "express";
import { ApplicationInstance } from "../index";
export declare class SimpleApp extends ApplicationInstance {
    constructor();
    simpleHandler(req: Request, res: Response): Promise<void>;
    simpleErrorHandler1(err: any, req: Request, res: Response): Promise<any>;
    simpleErrorHandler2(err: any, req: Request, res: Response): Promise<any>;
    private getAuthProvider();
}
