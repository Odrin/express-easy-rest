import { ApplicationInstance } from "../easy-rest/core/application-instance";
import { EasyRestConfig } from "../easy-rest/core/easy-rest-config";
declare class SimpleApp extends ApplicationInstance {
    config(configurator: EasyRestConfig): void;
}
export = SimpleApp;
