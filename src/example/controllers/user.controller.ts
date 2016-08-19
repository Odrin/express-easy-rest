import {Promise} from "es6-promise";
import {ApiController} from "../../easy-rest/controller/controller";
import {IActionResult} from "../../easy-rest/controller/action-result/action-result";
import {FromRoute} from "../../easy-rest/decorators/binding/from-route";
import {Controller} from "../../easy-rest/decorators/controller/controller";
import {Get} from "../../easy-rest/decorators/action/get";
import {Post} from "../../easy-rest/decorators/action/post";
import {FromBody} from "../../easy-rest/decorators/binding/from-body";
import {authorize} from "../../easy-rest/decorators/security/authorize";
import {AllowAnonymous} from "../../easy-rest/decorators/security/allow-anonymous";
import {Book, BookController} from "./book.controller";

@authorize('user')
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

  @Get('/book/add/:id')
  addBook(@FromRoute()id: number): IActionResult {
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
