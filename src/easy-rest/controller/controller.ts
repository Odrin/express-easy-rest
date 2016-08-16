import {Request} from "express";
import {IActionResult} from "./action-result/action-result";
import {OkResult} from "./action-result/ok-result";
import {ErrorResult} from "./action-result/error-result";
import {BadRequestResult} from "./action-result/bad-request-result";
import {NotFoundResult} from "./action-result/not-found-result";
import {IPrincipal} from "../security/principal/principal";

export class Controller {
  private _req: Request;
  private _user: IPrincipal;

  constructor() {
  }

  get requset(): Request {
    return this._req;
  }

  set requset(value: Request) {
    this._req = value;
  }

  get user(): IPrincipal {
    return this._user;
  }

  set user(value: IPrincipal) {
    this._user = value;
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
  new (): Controller;
}
