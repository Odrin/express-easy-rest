import { ApplicationInstance, HttpContext } from "../index";
export declare class SimpleApp extends ApplicationInstance {
    constructor();
    onRequest(httpContext: HttpContext): void;
    onError(error: any, httpContext: HttpContext): void;
    private getAuthProvider();
}
