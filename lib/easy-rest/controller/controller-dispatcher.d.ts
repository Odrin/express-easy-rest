import * as express from "express";
import { IControllerConstructor } from "./controller";
import { IParameterBindingOptions } from "../decorators/binding/parameter-binding-options";
export declare class ControllerDispatcher {
    private controllerConctructor;
    private action;
    private bindings;
    private returnType;
    constructor(controllerConctructor: IControllerConstructor, action: string, bindings: IParameterBindingOptions[], returnType: any);
    handleRequest: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
    private handleResult(result);
    private isActionResult(object);
    private handlePromiseResult(result);
    private handleActionResult(result);
    private handleResponseMessageResult(result);
    private instantiateController(req, res, next);
}
