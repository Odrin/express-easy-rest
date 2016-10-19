import {IActionResult} from "./action-result/action-result";
import {OkResult} from "./action-result/ok-result";
import {ErrorResult} from "./action-result/error-result";
import {BadRequestResult} from "./action-result/bad-request-result";
import {NotFoundResult} from "./action-result/not-found-result";
import {IPrincipal} from "../security/principal/principal";
import {HttpActionContext} from "../http/http-action-context";
import {Request} from "express";

export class ApiController {
  _context: HttpActionContext;

  constructor() {
  }

  get context(): HttpActionContext {
    return this._context;
  }

  get user(): IPrincipal | null {
    return this._context.httpContext.user;
  }

  get request(): Request {
    return this._context.httpContext.request;
  }

  protected ok<T>(data?: any): IActionResult {
    return new OkResult<T>(data);
  }

  protected error<T>(data?: any): IActionResult {
    return new ErrorResult<T>(data);
  }

  protected badRequest<T>(data?: any): IActionResult {
    return new BadRequestResult<T>(data);
  }

  protected notFound<T>(data?: any): IActionResult {
    return new NotFoundResult<T>(data);
  }
}

export interface IControllerConstructor {
  new (): ApiController;
}
