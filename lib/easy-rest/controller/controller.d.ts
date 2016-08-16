import { Request } from "express";
import { IActionResult } from "./action-result/action-result";
import { IPrincipal } from "../security/principal/principal";
export declare class Controller {
    private _req;
    private _user;
    constructor();
    requset: Request;
    user: IPrincipal;
    protected ok<T>(data?: any): IActionResult;
    protected error<T>(data?: any): IActionResult;
    protected badRequest<T>(data?: any): IActionResult;
    protected notFound<T>(data?: any): IActionResult;
}
export interface IControllerConstructor {
    new (): Controller;
}
