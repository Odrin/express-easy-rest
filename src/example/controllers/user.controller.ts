import {
  ApiController,
  IActionResult,
  FromBody,
  Post,
  Controller,
  Get,
  Authorize,
  AllowAnonymous
} from "../../index";
import {Book, BookController} from "./book.controller";

@Authorize('user')
@Controller({basePath: '/user'})
export class UserController extends ApiController {
  static books: Book[] = [
    {id: 2, name: 'book 2'},
    {id: 3, name: 'book 3'}
  ];

  @AllowAnonymous()
  @Get('/book/list')
  getBookList(): Promise<IActionResult> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.ok(UserController.books)), 3000);
    });
  }

  @Post('/book/add')
  addBook(@FromBody()id: number): IActionResult {
    let book = BookController.books.filter((book) => book.id === id)[0];

    if (!book) {
      return this.badRequest();
    }

    if (UserController.books.every((book) => book.id !== id)) {
      UserController.books.push(book);
    }

    return this.ok();
  }
}
