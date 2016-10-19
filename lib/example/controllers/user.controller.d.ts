import { ApiController, IActionResult } from "../../index";
import { Book } from "../models/book";
import { User } from "../models/user";
export declare class UserController extends ApiController {
    static books: Book[];
    static users: User[];
    getBookList(): Promise<IActionResult>;
    addBook(id: number): IActionResult;
    signIn(login: string, pwd: string): IActionResult;
    private getUserByLogin(login);
}
