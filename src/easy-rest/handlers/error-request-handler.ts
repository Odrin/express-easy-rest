import {Response, Request} from "express";

export interface IErrorRequestHandler {
  /**
   * Return error object to continue error handling
   * Return 'false', 'null' or 'undifined' to stop error handling
   */
  (err: any, req: Request, res: Response): boolean;
}
