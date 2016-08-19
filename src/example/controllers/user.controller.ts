import {Promise} from "es6-promise";
import {Controller} from "../../easy-rest/controller/controller";
import {IActionResult} from "../../easy-rest/controller/action-result/action-result";
import {fromRoute} from "../../easy-rest/decorators/binding/from-route";
import {controller} from "../../easy-rest/decorators/controller/controller";
import {get} from "../../easy-rest/decorators/action/get";
import {post} from "../../easy-rest/decorators/action/post";
import {fromBody} from "../../easy-rest/decorators/binding/from-body";
import {authorize} from "../../easy-rest/decorators/security/authorize";
import {allowAnonymous} from "../../easy-rest/decorators/security/allow-anonymous";
import {Book, BookController} from "./book.controller";

@authorize('user')
@controller({basePath: '/user'})
export class UserController extends Controller {
  static books: Book[] = [
    {id: 2, name: 'book 2'},
    {id: 3, name: 'book 3'}
  ];

  @allowAnonymous()
  @get('/book/list')
  getBookList(): Promise<IActionResult> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.ok(UserController.books)), 3000);
    });
  }

  @get('/book/add/:id')
  addBook(@fromRoute()id: number): IActionResult {
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
