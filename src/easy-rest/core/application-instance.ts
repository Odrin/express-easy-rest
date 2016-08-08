import {EasyRestConfig} from "./easy-rest-config";

export abstract class ApplicationInstance {

  constructor() {

  }

  abstract config(configurator: EasyRestConfig): void;

}
