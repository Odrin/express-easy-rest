import {Promise} from "es6-promise";
import {IPrincipal} from "../principal/principal";
import {Request} from "express";
import {Response} from "express";
import {IAuthenticationProvider} from "./authentication-provider";

export class DefaultAuthenticationProvider implements IAuthenticationProvider {
  onAuthentication(req: Request, res: Response): Promise<IPrincipal> {
    return Promise.resolve({
      identity: {
        isAuthenticated: false,
        name: null,
        authenticationType: null
      },
      isInRole(role: string) {
        return false;
      }
    });
  };
}
