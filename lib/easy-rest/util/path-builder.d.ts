import { PathParams } from "express-serve-static-core";
export declare class PathBuilder {
    static build(basePath: string, methodPath: PathParams, action: string): PathParams;
}
