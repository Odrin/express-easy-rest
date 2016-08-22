import { Promise } from "es6-promise";
import { ApiController, IActionResult } from "../../index";
export declare class BookController extends ApiController {
    static books: Book[];
    getBookList(): Promise<IActionResult>;
    getBook(id: number): Promise<IActionResult>;
    addBook(book: Book): IActionResult;
}
export declare class Book {
    id: number;
    name: string;
}
