import { Promise } from "es6-promise";
import { Response, Request } from "express";
export interface IRequestHandler {
    (req: Request, res: Response): Promise<void>;
}
