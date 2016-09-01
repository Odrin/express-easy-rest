import {Request, Response} from "express";
import {
  ApplicationInstance,
  IPrincipal,
  IAuthenticationProvider
} from "../index";

export class SimpleApp extends ApplicationInstance {

  constructor() {
    super();

    this.controllersPathPattern = __dirname + '/controllers/**/*.js';

    this.requestHandlers.push(this.simpleHandler);
    this.errorHandlers.push(...[this.simpleErrorHandler1, this.simpleErrorHandler2]);
    this.authenticationProvider = this.getAuthProvider();
  }

  simpleHandler(req: Request, res: Response): Promise<void> {
    console.log('Handle any request here');
    return Promise.resolve();
  }

  simpleErrorHandler1(err: any, req: Request, res: Response): Promise<any> {
    console.log(`Log error: ${err}`);
    return Promise.resolve(err);
  }

  simpleErrorHandler2(err: any, req: Request, res: Response): Promise<any> {
    console.log(`Handle error`);

    res.status(500).send('Sorry, service temporarily unavailable.');

    return Promise.reject(null);
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
