import { Request } from "express";
export declare class ContextDataProvider {
    static DATA_CONTAINER_KEY: string;
    static getDataContainer(req: Request): {
        [key: string]: any;
    };
    static getData<T>(req: Request, key: string, defaultValue?: T): T;
    static setData<T>(req: Request, key: string, value: T): void;
}
