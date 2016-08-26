import { HttpContext } from "./http-context";
import { HttpControllerDescriptor } from "./http-controller-descriptor";
import { HttpActionDescriptor } from "./http-action-descriptor";
export declare class HttpActionContext {
    httpContext: HttpContext;
    controllerDescriptor: HttpControllerDescriptor;
    actionDescriptor: HttpActionDescriptor;
    constructor(httpContext: HttpContext, controllerDescriptor: HttpControllerDescriptor, actionDescriptor: HttpActionDescriptor);
}
