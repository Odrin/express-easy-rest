import {Promise} from "es6-promise";
import {IPrincipal} from "../principal/principal";
import {Request} from "express";
import {Response} from "express";

export interface IAuthenticationProvider {
  onAuthentication(req: Request, res: Response): Promise<IPrincipal>;
}
