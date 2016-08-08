import {Promise} from "es6-promise";
import {Controller} from "../../easy-rest/core/controller";
import {IActionResult} from "../../easy-rest/controller/action-result/action-result";
import {fromRoute} from "../../easy-rest/decorators/binding/from-route";
import {controller} from "../../easy-rest/decorators/controller/controller";
import {get} from "../../easy-rest/decorators/action/get";
import {post} from "../../easy-rest/decorators/action/post";
import {fromBody} from "../../easy-rest/decorators/binding/from-body";

@controller({basePath: '/book'})
export class BookController extends Controller {
  static books: Book[] = [
    {id: 1, name: 'book 1'},
    {id: 2, name: 'book 2'},
    {id: 3, name: 'book 3'}
  ];

  @get('/list')
  getBookList(): Promise<IActionResult> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.ok(BookController.books)), 3000);
    });
  }

  @get('/:id')
  getBook(@fromRoute('id')id: number): Promise<IActionResult> {
    return new Promise((resolve) => {
      var book = BookController.books.filter((book) => book.id === id)[0];
      setTimeout(() => {
        if (book) {
          resolve(this.ok(book));
        }
        else {
          resolve(this.notFound());
        }
      }, 1000);
    });
  }

  @post('/add')
  addBook(@fromBody()book: Book): IActionResult {
    if (!book) {
      return this.error();
    }

    BookController.books.push(book);

    return this.ok();
  }
}

export class Book {
  id: number;
  name: string;
}
