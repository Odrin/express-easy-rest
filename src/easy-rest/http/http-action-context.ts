import {HttpContext} from "./http-context";
import {HttpControllerDescriptor} from "./http-controller-descriptor";
import {HttpActionDescriptor} from "./http-action-descriptor";


export class HttpActionContext {
  constructor(public httpContext: HttpContext,
              public controllerDescriptor: HttpControllerDescriptor,
              public actionDescriptor: HttpActionDescriptor) {
  }


}
