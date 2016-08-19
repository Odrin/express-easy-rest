export declare class Metadata {
    static has(metadataKey: any, target: Object, targetKey?: string | symbol): boolean;
    static get<T>(metadataKey: any, target: Object, targetKey?: string | symbol): T;
    static define(metadataKey: any, metadataValue: any, target: Object, targetKey?: string | symbol): void;
    static append<T>(metadataKey: any, metadataValue: T, target: Object, targetKey?: string | symbol): void;
    static getParamTypes(target: Object, targetKey: string | symbol): any[];
    static getReturnType(target: Object, targetKey: string | symbol): any;
}
