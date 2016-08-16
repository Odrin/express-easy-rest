import {Promise} from "es6-promise";
import {Response, Request} from "express";

export interface IRequestHandler {
  /**
   * Resolve to continue with next handler
   * Reject to continue with error handlers
   */
  (req: Request, res: Response): Promise<void>;
}
