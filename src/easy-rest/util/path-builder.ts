import {ActionPathParam} from "../api/action-path-params";

export class PathBuilder {
  static build(basePath: string | undefined, methodPath: ActionPathParam | undefined, action: string): ActionPathParam {
    if (basePath && methodPath && typeof (methodPath) !== 'string') {
      throw new Error(`Path builder error: incompatible types`);
    }

    if (methodPath && typeof (methodPath) !== 'string') {
      return methodPath;
    }

    basePath = basePath ? '/' + basePath.replace(/^\/+|\/+$/g, '') : '';

    return basePath + '/' + (<string>methodPath || action.toLowerCase()).replace(/^\/+|\/+$/g, '');
  }
}
