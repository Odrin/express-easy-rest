import { Promise } from "es6-promise";
import { Response, Request } from "express";
export interface IErrorRequestHandler {
    (err: any, req: Request, res: Response): Promise<any>;
}
