import { Response, Request } from "express";
export interface IRequestHandler {
    (req: Request, res: Response): boolean;
}
