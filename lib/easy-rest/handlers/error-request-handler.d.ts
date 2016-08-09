import { Response, Request } from "express";
export interface IErrorRequestHandler {
    (err: any, req: Request, res: Response): boolean;
}
