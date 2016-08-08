import {NextFunction, Request, Response} from "express";
import {ApplicationInstance} from "../easy-rest/core/application-instance";
import {EasyRestConfig} from "../easy-rest/core/easy-rest-config";
import {SimpleController} from "./controllers/simple.controller";
import {BookController} from "./controllers/book.controller";

class SimpleApp extends ApplicationInstance {

  config(configurator: EasyRestConfig): void {
    configurator.controllers.push(...[SimpleController, BookController]);
    configurator.handlers.push(simpleHandler);
    configurator.errorHandlers.push(simpleErrorHandler);
  }

}

function simpleHandler(req: Request, res: Response, next: NextFunction) {
  console.log('Handle any request here');
  next();
}

function simpleErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(`Handle error here: ${err}`);
  next();
}

export = SimpleApp;
