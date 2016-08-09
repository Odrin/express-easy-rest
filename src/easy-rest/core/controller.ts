import {Request, Response, NextFunction} from "express";
import {IActionResult} from "../controller/action-result/action-result";
import {OkResult} from "../controller/action-result/ok-result";
import {ErrorResult} from "../controller/action-result/error-result";
import {BadRequestResult} from "../controller/action-result/bad-request-result";
import {NotFoundResult} from "../controller/action-result/not-found-result";

export class Controller {
  _req: Request;
  _res: Response;

  constructor() {
  }

  get requset(): Request {
    return this._req;
  }

  get response(): Response {
    return this._res;
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
