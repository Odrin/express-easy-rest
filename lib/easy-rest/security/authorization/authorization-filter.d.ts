import { Request, Response } from "express";
export declare class AuthorizationFilter {
    roles: string[];
    onAuthorization(req: Request, res: Response): boolean;
    protected isAuthorized(req: Request): boolean;
    protected handleUnauthorizedRequest(res: Response): void;
}
