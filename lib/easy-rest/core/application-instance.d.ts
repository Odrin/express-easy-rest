/// <reference types="express" />
import * as express from "express";
import { IAuthenticationProvider } from "../security/authentication/authentication-provider";
import { AuthorizationFilter } from "../security/authorization/authorization-filter";
import { HttpContext } from "../http/http-context";
export declare abstract class ApplicationInstance {
    private express;
    controllersPathPattern: string;
    parsers: express.RequestHandler[];
    authenticationProvider: IAuthenticationProvider;
    constructor();
    middleware(): express.Express;
    getAuthorizationFilter(): AuthorizationFilter;
    onRequest(httpContext: HttpContext): void;
    onError(error: any, httpContext: HttpContext): void;
    private loadModules();
    private initializeContext();
    private configAuthProvider();
    private configParsers();
    private configRequestHandler();
    private configErrorHandler();
    private configRouter();
}
