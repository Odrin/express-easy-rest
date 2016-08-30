import { ApiController, IActionResult } from "../../index";
import { Book } from "./book.controller";
export declare class UserController extends ApiController {
    static books: Book[];
    static users: User[];
    getBookList(): Promise<IActionResult>;
    addBook(id: number): IActionResult;
    signIn(login: string, pwd: string): IActionResult;
    private getUserByLogin(login);
}
export declare class User {
    login: string;
    pwd: string;
}
