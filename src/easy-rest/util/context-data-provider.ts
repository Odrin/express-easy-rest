import {Request} from "express";

export class ContextDataProvider {
  static DATA_CONTAINER_KEY = '_easy-rest';

  static getDataContainer(req: Request): {[key: string]: any} {
    let data = (<any>req)['DATA_CONTAINER_KEY'];

    if (!data) {
      data = {};
      (<any>req)['DATA_CONTAINER_KEY'] = data;
    }

    return data;
  }

  static getData<T>(req: Request, key: string, defaultValue?: T = null): T {
    let data = ContextDataProvider.getDataContainer(req);
    return <T>data[key] || defaultValue;
  }

  static setData<T>(req: Request, key: string, value: T): void {
    let data = ContextDataProvider.getDataContainer(req);
    data[key] = value;
  }
}
