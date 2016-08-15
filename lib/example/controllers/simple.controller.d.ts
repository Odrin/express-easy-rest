import { Controller } from "../../easy-rest/core/controller";
export declare class SimpleController extends Controller {
    constructor();
    hello(name: string): string;
    getObject(name: string): Object;
    getError(): void;
}
