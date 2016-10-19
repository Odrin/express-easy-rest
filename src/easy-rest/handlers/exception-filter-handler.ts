import {HttpActionContext} from "../http/http-action-context";

export interface IExceptionFilterHandler {
  (context: HttpActionContext, error: any): void;
}
