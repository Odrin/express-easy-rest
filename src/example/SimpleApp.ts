import {NextFunction, Request, Response} from "express";
import {ApplicationInstance} from "../easy-rest/core/application-instance";
import {EasyRestConfig} from "../easy-rest/core/easy-rest-config";
import {SimpleController} from "./controllers/simple.controller";
import {BookController} from "./controllers/book.controller";
import {Promise} from "es6-promise";

class SimpleApp extends ApplicationInstance {

  config(configurator: EasyRestConfig): void {
    configurator.controllers.push(...[SimpleController, BookController]);
    configurator.requestHandlers.push(simpleHandler);
    configurator.errorHandlers.push(...[simpleErrorHandler1, simpleErrorHandler2]);
  }

}

function simpleHandler(req: Request, res: Response): Promise<void> {
  console.log('Handle any request here');
  return Promise.resolve();
}

function simpleErrorHandler1(err: any, req: Request, res: Response): Promise<any> {
  console.log(`Log error: ${err}`);
  return Promise.resolve(err);
}

function simpleErrorHandler2(err: any, req: Request, res: Response): Promise<any> {
  console.log(`Handle error`);

  res.status(500).send('Sorry, service temporarily unavailable.');

  return Promise.reject(null);
}

export = SimpleApp;
