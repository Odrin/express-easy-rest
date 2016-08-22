import { ApiController } from "../../index";
export declare class SimpleController extends ApiController {
    constructor();
    hello(name: string): string;
    getObject(name: string): Object;
    getError(): void;
}
