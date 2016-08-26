[![Build Status](https://travis-ci.org/Odrin/express-easy-rest.svg?branch=master)](https://travis-ci.org/Odrin/express-easy-rest)

#express-easy-rest
Simple and easy, [express](https://github.com/expressjs/express/) based, charged with power of TypeScript, REST API framework.

```TypeScript
class App extends ApplicationInstance {
  constructor() {
      super();
  
      this.controllers.push(...[BookController]);
    }
}

export = new App();
```
```TypeScript
@Controller({basePath: '/book'})
export class BookController extends ApiController {
  private books: Book[] = [...];

  @Get('/list')
  getBooks(): Promise<Book[]> {
    return new Promise((resolve: any) => {
      setTimeout(() => resolve(this.books), 3000); // here your async db call or anything else
    });
  }
}
```
```JavaScript
var express = require('express');
var app = require('./lib/app');

express()
  .use('/api', app.middleware())
  .listen(8000);
```
>Simple things should be simple, complex things should be possible | Alan Kay

##Installation
```bash
npm install express-easy-rest
```

##Examples
You can find more examples [here](src/example).

##Features
* Controller based structure
* Fast and easy decorators syntax
* Scalable and customizable architecture
* It's just a 0.X.X version, so... Lots of features coming soon

Any coincidence with asp.net WebAPI platform are accidental... or not.

##Why TypeScript?
TypeScript helps you to create a well-structured, scalable and neat applications with the ability to use the most modern technologies.
Magic of decorators makes your code more flexible and clean, and allows you to pay more attention to what you *want* to do, rather than *how* to do it.
