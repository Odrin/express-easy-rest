import {Response, Request} from "express";

export interface IRequestHandler {
  /**
   * Throw exception to continue request execution with error handlers
   */
  (req: Request, res: Response): void;
}
