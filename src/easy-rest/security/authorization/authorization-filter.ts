import {HttpActionContext} from "../../http/http-action-context";
import {HttpContext} from "../../http/http-context";
import {AUTH_ANONYMOUS_METADATA_KEY} from "../../metadata/metadata-keys";
import {Metadata} from "../../metadata/metadata";

export class AuthorizationFilter {
  roles: string[];

  onAuthorization(actionContext: HttpActionContext): boolean {
    if (this.skipAuthorization(actionContext)) {
      return true;
    }

    if (!this.isAuthorized(actionContext)) {
      this.handleUnauthorizedRequest(actionContext.httpContext);
      return false;
    }

    return true;
  }

  protected isAuthorized(actionContext: HttpActionContext): boolean {
    let user = actionContext.httpContext.user;

    if (!user || !user.identity || !user.identity.isAuthenticated) {
      return false;
    }

    if (this.roles.length !== 0) {
      let hasRole = false;

      for (let role in this.roles) {
        hasRole = hasRole || user.isInRole(role);
      }

      if (!hasRole) {
        return false;
      }
    }

    return true;
  }

  protected handleUnauthorizedRequest(httpContext: HttpContext) {
    httpContext.response.status(401).send();
  }

  private skipAuthorization(actionContext: HttpActionContext): boolean {
    let target = actionContext.controllerDescriptor.controller.prototype;
    let key = actionContext.actionDescriptor.actionName;

    return Metadata.get<boolean>(AUTH_ANONYMOUS_METADATA_KEY, target, key);
  }
}
