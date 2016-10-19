export class Metadata {
  static has(metadataKey: any, target: Object, targetKey?: string | symbol): boolean {
    if (targetKey) {
      return Reflect.hasMetadata(metadataKey, target, targetKey);
    }
    else {
      return Reflect.hasMetadata(metadataKey, target);
    }
  }

  static get<T>(metadataKey: any, target: Object, targetKey?: string | symbol): T {
    if (targetKey) {
      return Reflect.getMetadata(metadataKey, target, targetKey);
    }
    else {
      return Reflect.getMetadata(metadataKey, target);
    }
  }

  static define(metadataKey: any, metadataValue: any, target: Object, targetKey?: string | symbol) {
    if (targetKey) {
      Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
    }
    else {
      Reflect.defineMetadata(metadataKey, metadataValue, target);
    }
  }

  static append<T>(metadataKey: any, metadataValue: T, target: Object, targetKey?: string | symbol) {
    let values: T[] = Metadata.get<T[]>(metadataKey, target, targetKey) || [];

    values.push(metadataValue);

    Metadata.define(metadataKey, values, target, targetKey);
  }

  static getParamTypes(target: Object, targetKey: string | symbol): any[] {
    return Reflect.getMetadata('design:paramtypes', target, targetKey);
  }

  static getReturnType(target: Object, targetKey: string | symbol): any {
    return Reflect.getMetadata('design:returntype', target, targetKey);
  }
}
