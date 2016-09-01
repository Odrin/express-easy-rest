import * as express from "express";
import { IRequestHandler } from "../handlers/request-handler";
import { IErrorRequestHandler } from "../handlers/error-request-handler";
import { IAuthenticationProvider } from "../security/authentication/authentication-provider";
import { AuthorizationFilter } from "../security/authorization/authorization-filter";
export declare abstract class ApplicationInstance {
    private express;
    controllersPathPattern: string;
    requestHandlers: IRequestHandler[];
    errorHandlers: IErrorRequestHandler[];
    parsers: express.RequestHandler[];
    authenticationProvider: IAuthenticationProvider;
    constructor();
    middleware(): express.Express;
    getAuthorizationFilter(): AuthorizationFilter;
    private loadModules();
    private initializeContext();
    private configAuthProvider();
    private configParsers();
    private configHandlers();
    private configErrorHandlers();
    private configRouter();
}
