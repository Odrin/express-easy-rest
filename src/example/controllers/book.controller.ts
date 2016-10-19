import {
  ApiController,
  IActionResult,
  FromRoute,
  Controller,
  Get,
  Post,
  FromBody
} from "../../index";
import {Book} from "../models/book";

@Controller({basePath: '/book'})
export class BookController extends ApiController {
  static books: Book[] = [
    {id: 1, name: 'book 1'},
    {id: 2, name: 'book 2'},
    {id: 3, name: 'book 3'}
  ];

  @Get('/list')
  getBookList(): Promise<IActionResult> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.ok(BookController.books)), 3000);
    });
  }

  @Get('/:id')
  getBook(@FromRoute('id')id: number): Promise<IActionResult> {
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

  @Post('/add')
  addBook(@FromBody()book: Book): IActionResult {
    if (!book) {
      return this.error();
    }

    BookController.books.push(book);

    return this.ok();
  }
}
