import { PathParams } from "express-serve-static-core";
export interface IActionOptions {
    method: string;
    path?: PathParams;
}
