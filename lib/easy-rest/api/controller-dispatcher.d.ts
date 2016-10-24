/// <reference types="express" />
import * as express from "express";
import { IControllerConstructor } from "./api-controller";
import { ApplicationInstance } from "../core/application-instance";
export declare class ControllerDispatcher {
    private instance;
    private controller;
    private action;
    private bindings;
    private authorizationFilter;
    private returnType;
    private exceptionHandler;
    private dataBinder;
    constructor(instance: ApplicationInstance, controller: IControllerConstructor, action: string);
    handleRequest: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
    private applyAction(action, instance, parameters);
    private defaultExceptionHandler(context, error);
    private handleResult(result);
    private isActionResult(object);
    private handlePromiseResult(result);
    private handleActionResult(result);
    private handleResponseMessageResult(result);
    private instantiateController(context);
    private getActionContext(req);
    private getHttpContext(req);
}
