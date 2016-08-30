import { ActionPathParam } from "../api/action-path-params";
export declare class PathBuilder {
    static build(basePath: string, methodPath: ActionPathParam, action: string): ActionPathParam;
}
