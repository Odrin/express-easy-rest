import { ActionPathParam } from "../api/action-path-params";
export declare class PathBuilder {
    static build(basePath: string | undefined, methodPath: ActionPathParam | undefined, action: string): ActionPathParam;
}
