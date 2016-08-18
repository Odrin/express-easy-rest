import * as express from "express";
import { IControllerConstructor } from "../controller/controller";
import { IRequestHandler } from "../handlers/request-handler";
import { IErrorRequestHandler } from "../handlers/error-request-handler";
import { IAuthenticationProvider } from "../security/authentication/authentication-provider";
export declare abstract class ApplicationInstance {
    private express;
    controllers: IControllerConstructor[];
    requestHandlers: IRequestHandler[];
    errorHandlers: IErrorRequestHandler[];
    parsers: express.RequestHandler[];
    authenticationProvider: IAuthenticationProvider;
    constructor();
    middleware(): express.Express;
    private configAuthProvider();
    private configParsers();
    private configHandlers();
    private configErrorHandlers();
    private configRouter();
}
