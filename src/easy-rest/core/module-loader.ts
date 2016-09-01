import * as Glob from 'glob';
import {IControllerConstructor} from "../api/api-controller";

//TODO: don't use static
export class ModuleLoader {
  static controllers: IControllerConstructor[] = [];

  static load(pattern: string) {
    let files = Glob.sync(pattern);

    for (let i = 0; i < files.length; i++) {
      require(files[i]);
    }
  }
}
