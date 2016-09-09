import * as express from "express";
import { IRequestHandler } from "../handlers/request-handler";
import { IAuthenticationProvider } from "../security/authentication/authentication-provider";
import { AuthorizationFilter } from "../security/authorization/authorization-filter";
import { HttpContext } from "../http/http-context";
export declare abstract class ApplicationInstance {
    private express;
    controllersPathPattern: string;
    requestHandlers: IRequestHandler[];
    parsers: express.RequestHandler[];
    authenticationProvider: IAuthenticationProvider;
    constructor();
    middleware(): express.Express;
    getAuthorizationFilter(): AuthorizationFilter;
    onError(error: any, httpContext: HttpContext): void;
    private loadModules();
    private initializeContext();
    private configAuthProvider();
    private configParsers();
    private configHandlers();
    private configErrorHandler();
    private configRouter();
}
