import { ApplicationInstance } from "../index";
import { HttpContext } from "../easy-rest/http/http-context";
export declare class SimpleApp extends ApplicationInstance {
    constructor();
    onRequest(httpContext: HttpContext): void;
    onError(error: any, httpContext: HttpContext): void;
    private getAuthProvider();
}
