import {Request, Response} from "express";
import {
  ApplicationInstance,
  IPrincipal,
  IAuthenticationProvider
} from "../index";
import {SimpleController} from "./controllers/simple.controller";
import {BookController} from "./controllers/book.controller";
import {UserController} from "./controllers/user.controller";

export class SimpleApp extends ApplicationInstance {

  constructor() {
    super();

    this.controllers.push(...[SimpleController, BookController, UserController]);
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
        return Promise.resolve<IPrincipal>({
          identity: {
            authenticationType: 'form',
            isAuthenticated: true,
            name: 'User'
          },
          isInRole(role: string): boolean {
            return false;
          }
        });
      }
    };
  }
}
