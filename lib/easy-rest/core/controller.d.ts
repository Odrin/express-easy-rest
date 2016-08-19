import { Request, Response } from "express";
import { IActionResult } from "../controller/action-result/action-result";
export declare class Controller {
    _req: Request;
    _res: Response;
    constructor();
    requset: Request;
    response: Response;
    protected ok<T>(data?: any): IActionResult;
    protected error<T>(data?: any): IActionResult;
    protected badRequest<T>(data?: any): IActionResult;
    protected notFound<T>(data?: any): IActionResult;
}
export interface IControllerConstructor {
    new (): Controller;
}
