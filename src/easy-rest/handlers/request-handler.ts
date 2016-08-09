import {Response, Request} from "express";

export interface IRequestHandler {
  /**
   * Return 'true' to continue request execution
   * Return 'false' to stop request execution
   * Throw exception to continue request execution with error handlers
   */
  (req: Request, res: Response): boolean;
}
