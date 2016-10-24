/// <reference types="express" />
import { IActionResult } from "./action-result/action-result";
import { IPrincipal } from "../security/principal/principal";
import { HttpActionContext } from "../http/http-action-context";
import { Request } from "express";
export declare class ApiController {
    _context: HttpActionContext;
    constructor();
    readonly context: HttpActionContext;
    readonly user: IPrincipal | null;
    readonly request: Request;
    protected ok<T>(data?: any): IActionResult;
    protected error<T>(data?: any): IActionResult;
    protected badRequest<T>(data?: any): IActionResult;
    protected notFound<T>(data?: any): IActionResult;
}
export interface IControllerConstructor {
    new (): ApiController;
}
