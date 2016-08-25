import {Request, Response} from "express";
import {IPrincipal} from "../principal/principal";
import {ContextDataProvider} from "../../util/context-data-provider";

export class AuthorizationFilter {
  roles: string[];

  onAuthorization(req: Request, res: Response): boolean {

    //TODO: skip authorization

    if (!this.isAuthorized(req)) {
      this.handleUnauthorizedRequest(res);
      return false;
    }

    return true;
  }

  protected isAuthorized(req: Request): boolean {
    let user = ContextDataProvider.getData<IPrincipal>(req, 'principal');

    if (!user || !user.identity || !user.identity.isAuthenticated) {
      return false;
    }

    if (this.roles.length !== 0) {
      let hasRole = false;

      for (let role of this.roles) {
        hasRole = hasRole || user.isInRole(role);
      }

      if (!hasRole) {
        return false;
      }
    }

    return true;
  }

  protected handleUnauthorizedRequest(res: Response) {
    res.status(401).send();
  }
}
