import {
  ApiController,
  IActionResult,
  FromBody,
  Post,
  Get,
  Authorize,
  AllowAnonymous
} from "../../index";
import {Book, BookController} from "./book.controller";

@Authorize('user')
export class UserController extends ApiController {
  static books: Book[] = [
    {id: 2, name: 'book 2'},
    {id: 3, name: 'book 3'}
  ];
  static users: User[] = [
    { login: 'Admin', pwd: 'qwerty' },
    { login: 'User', pwd: 'user123' }
  ];

  @Get('/user/book/list')
  getBookList(): Promise<IActionResult> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.ok(UserController.books)), 3000);
    });
  }

  @Post('/user/book/add')
  addBook(@FromBody('id')id: number): IActionResult {
    let book = BookController.books.filter((book) => book.id === id)[0];

    if (!book) {
      return this.badRequest();
    }

    if (UserController.books.every((book) => book.id !== id)) {
      UserController.books.push(book);
    }

    return this.ok();
  }

  @AllowAnonymous()
  @Post('/user/signin')
  signIn(@FromBody('login')login: string, @FromBody('pwd')pwd: string): IActionResult {
    if (!login || !pwd) {
      return this.badRequest('Incorrect auth data');
    }

    let user = this.getUserByLogin(login);

    if (user === null) {
      return this.notFound(`User "${login}" not found`);
    }

    if (user.pwd !== pwd) {
      return this.badRequest('Incorrect password');
    }

    (<any>this.request)['session'].login = login;

    return this.ok();
  }

  private getUserByLogin(login: string) {
    for (let user of UserController.users) {
      if (user.login === login) {
        return user;
      }
    }

    return null;
  }
}

export class User {
  login: string;
  pwd: string;
}
