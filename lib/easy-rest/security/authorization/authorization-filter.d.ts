import { HttpActionContext } from "../../http/http-action-context";
import { HttpContext } from "../../http/http-context";
export declare class AuthorizationFilter {
    private _roles;
    roles: string[];
    onAuthorization(actionContext: HttpActionContext): boolean;
    protected isAuthorized(actionContext: HttpActionContext): boolean;
    protected handleUnauthorizedRequest(httpContext: HttpContext): void;
    private skipAuthorization(actionContext);
}
