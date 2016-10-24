/// <reference types="express" />
import { Request } from "express";
import { HttpContext } from "../http/http-context";
export declare class HttpContextProvider {
    static HTTP_CONTEXT_KEY: string;
    static getContext(req: Request): HttpContext;
    static setContext(req: Request, httpContext: HttpContext): void;
}
