import {PathParams} from "express-serve-static-core";

export interface IActionOptions {
  /**
   * Request method
   */
  method: string;
  /**
   * Method path. If not specified the name of the method used.
   * eg. getBook() -> /getbook/
   */
  path?: PathParams;
}
