import { IControllerConstructor } from "../api/api-controller";
export declare class ModuleLoader {
    static controllers: IControllerConstructor[];
    static load(pattern: string): void;
}
