import { EasyRestConfig } from "./easy-rest-config";
export declare abstract class ApplicationInstance {
    constructor();
    abstract config(configurator: EasyRestConfig): void;
}
