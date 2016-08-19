import * as express from "express";
import { ApplicationInstance } from "./application-instance";
import { IControllerConstructor } from "../controller/controller";
import { IRequestHandler } from "../handlers/request-handler";
import { IErrorRequestHandler } from "../handlers/error-request-handler";
export declare class EasyRestConfig {
    static create(appCls: new () => ApplicationInstance): express.Express;
    private express;
    private instance;
    controllers: IControllerConstructor[];
    requestHandlers: IRequestHandler[];
    errorHandlers: IErrorRequestHandler[];
    parsers: express.RequestHandler[];
    constructor(Cls: new () => ApplicationInstance);
    private create();
    private configParsers();
    private configHandlers();
    private configErrorHandlers();
    private configRouter();
}
