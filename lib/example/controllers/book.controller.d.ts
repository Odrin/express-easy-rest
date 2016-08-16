import { Promise } from "es6-promise";
import { Controller } from "../../easy-rest/controller/controller";
import { IActionResult } from "../../easy-rest/controller/action-result/action-result";
export declare class BookController extends Controller {
    static books: Book[];
    getBookList(): Promise<IActionResult>;
    getBook(id: number): Promise<IActionResult>;
    addBook(book: Book): IActionResult;
}
export declare class Book {
    id: number;
    name: string;
}
