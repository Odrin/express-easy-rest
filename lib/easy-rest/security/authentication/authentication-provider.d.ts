/// <reference types="express" />
import { IPrincipal } from "../principal/principal";
import { Request } from "express";
import { Response } from "express";
export interface IAuthenticationProvider {
    onAuthentication(req: Request, res: Response): Promise<IPrincipal>;
}
