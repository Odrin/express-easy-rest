import { ApiController, IActionResult } from "../../index";
import { Book } from "./book.controller";
export declare class UserController extends ApiController {
    static books: Book[];
    getBookList(): Promise<IActionResult>;
    addBook(id: number): IActionResult;
}
