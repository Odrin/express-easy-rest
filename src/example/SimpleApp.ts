import {Request, Response} from "express";
import {
  ApplicationInstance,
  IPrincipal,
  IAuthenticationProvider
} from "../index";
import {HttpContext} from "../easy-rest/http/http-context";

export class SimpleApp extends ApplicationInstance {

  constructor() {
    super();

    this.controllersPathPattern = __dirname + '/controllers/**/*.js';

    this.requestHandlers.push(this.simpleHandler);
    this.authenticationProvider = this.getAuthProvider();
  }

  onError(error: any, httpContext: HttpContext) {
    httpContext.response.status(500).send('Sorry, service temporarily unavailable.');
    httpContext.next();
  }

  simpleHandler(req: Request, res: Response): Promise<void> {
    console.log('Handle any request here');
    return Promise.resolve();
  }

  private getAuthProvider(): IAuthenticationProvider {
    return {
      onAuthentication(req: Request, res: Response): Promise<IPrincipal> {
        let session: any = (<any>req)['session'] || {};
        let principal: IPrincipal = {
          identity: {
            authenticationType: 'form',
            isAuthenticated: !!session.login,
            name: session.login || null
          },
          isInRole(role: string): boolean {
            if (session.login === 'Admin') {
              return true;
            }

            return session.login && role === 'user';
          }
        };

        return Promise.resolve<IPrincipal>(principal);
      }
    };
  }
}
