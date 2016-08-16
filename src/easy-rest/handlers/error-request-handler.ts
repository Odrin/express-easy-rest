import {Promise} from "es6-promise";
import {Response, Request} from "express";

export interface IErrorRequestHandler {
  /**
   * Resolve with error object to continue error handling
   * Reject to stop error handling
   */
  (err: any, req: Request, res: Response): Promise<any>;
}
