import { Promise } from "es6-promise";
import { Controller } from "../../easy-rest/controller/controller";
import { IActionResult } from "../../easy-rest/controller/action-result/action-result";
import { Book } from "./book.controller";
export declare class UserController extends Controller {
    static books: Book[];
    getBookList(): Promise<IActionResult>;
    addBook(id: number): IActionResult;
}
