import { ApiController, IActionResult } from "../../index";
import { Book } from "../models/book";
export declare class BookController extends ApiController {
    static books: Book[];
    getBookList(): Promise<IActionResult>;
    getBook(id: number): Promise<IActionResult>;
    addBook(book: Book): IActionResult;
}
