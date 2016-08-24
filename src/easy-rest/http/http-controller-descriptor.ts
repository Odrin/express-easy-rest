import {IControllerConstructor} from "../api/api-controller";

export class HttpControllerDescriptor {
  controllerName: string;
  controller: IControllerConstructor;
}
