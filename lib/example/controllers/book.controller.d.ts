import { Promise } from "es6-promise";
import { ApiController } from "../../easy-rest/controller/controller";
import { IActionResult } from "../../easy-rest/controller/action-result/action-result";
export declare class BookController extends ApiController {
    static books: Book[];
    getBookList(): Promise<IActionResult>;
    getPrivateBookList(): Promise<IActionResult>;
    getBook(id: number): Promise<IActionResult>;
    addBook(book: Book): IActionResult;
}
export declare class Book {
    id: number;
    name: string;
}
