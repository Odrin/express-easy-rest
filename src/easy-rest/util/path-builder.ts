import {PathParams} from "express-serve-static-core";

export class PathBuilder {
  static build(basePath: string, methodPath: PathParams, action: string): PathParams {
    if (basePath && typeof (methodPath) !== 'string') {
      throw new Error(`Path builder error: incompatible types`);
    }

    if (!!methodPath && typeof (methodPath) !== 'string') {
      return methodPath;
    }

    return '/' + (basePath.replace(/^\/+|\/+$/g, '') || '') +
           '/' + ((<string>methodPath).replace(/^\/+|\/+$/g, '') || action.toLowerCase());
  }
}
