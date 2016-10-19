import {Request, Response} from "express";
import {
  ApplicationInstance,
  IPrincipal,
  IAuthenticationProvider,
  HttpContext
} from "../index";

export class SimpleApp extends ApplicationInstance {

  constructor() {
    super();

    this.controllersPathPattern = __dirname + '/controllers/**/*.js';
    this.authenticationProvider = this.getAuthProvider();
  }

  onRequest(httpContext: HttpContext) {
    console.log('Handle any request here');
    httpContext.next();
  }

  onError(error: any, httpContext: HttpContext) {
    if (!httpContext.response.headersSent) {
      httpContext.response.status(500);
      httpContext.response.send('Sorry, service temporarily unavailable.');
    }

    httpContext.next();
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
