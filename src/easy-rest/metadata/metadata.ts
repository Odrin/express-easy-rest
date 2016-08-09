export class Metadata {
  static has(metadataKey: any, target: Object, targetKey?: string | symbol): boolean {
    return Reflect.hasMetadata(metadataKey, target, targetKey);
  }

  static get<T>(metadataKey: any, target: Object, targetKey?: string | symbol): T {
    return Reflect.getMetadata(metadataKey, target, targetKey);
  }

  static define(metadataKey: any, metadataValue: any, target: Object, targetKey?: string | symbol) {
    Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
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
