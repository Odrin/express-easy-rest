import { Promise } from "es6-promise";
import { IPrincipal } from "../principal/principal";
import { Request } from "express";
import { Response } from "express";
import { IAuthenticationProvider } from "./authentication-provider";
export declare class DefaultAuthenticationProvider implements IAuthenticationProvider {
    onAuthentication(req: Request, res: Response): Promise<IPrincipal>;
}
