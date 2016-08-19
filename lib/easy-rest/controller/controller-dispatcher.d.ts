import * as express from "express";
import { IControllerConstructor } from "./controller";
import { ApplicationInstance } from "../core/application-instance";
export declare class ControllerDispatcher {
    private instance;
    private controllerConctructor;
    private action;
    private bindings;
    private authorizationFilter;
    constructor(instance: ApplicationInstance, controllerConctructor: IControllerConstructor, action: string);
    handleRequest: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
    private handleResult(result);
    private isActionResult(object);
    private handlePromiseResult(result);
    private handleActionResult(result);
    private handleResponseMessageResult(result);
    private instantiateController(req, res, next);
}
