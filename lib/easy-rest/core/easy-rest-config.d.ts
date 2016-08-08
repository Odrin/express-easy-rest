import "reflect-metadata";
import * as express from "express";
import { ApplicationInstance } from "./application-instance";
import { IControllerConstructor } from "./controller";
export declare class EasyRestConfig {
    static create(appCls: new () => ApplicationInstance): express.Express;
    private express;
    private instance;
    controllers: IControllerConstructor[];
    handlers: express.RequestHandler[];
    errorHandlers: express.ErrorRequestHandler[];
    parsers: express.RequestHandler[];
    constructor(Cls: new () => ApplicationInstance);
    private create();
    private configHandlers();
    private configParsers();
    private configErrorHandlers();
    private configRouter();
}
