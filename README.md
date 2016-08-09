#express-easy-rest
Simple and easy, [express](https://github.com/expressjs/express/) based, charged with power of TypeScript, REST API framework.

```TypeScript
class App extends ApplicationInstance {
  config(configurator: EasyRestConfig): void {
    configurator.controllers.push(...[BookController])
  }
}
```
```TypeScript
@controller({basePath: '/book'})
export class BookController extends Controller {
  private books: Book[] = [...];

  @get('/list')
  getBooks(): Promise<Book[]> {
    return new Promise((resolve: any) => {
      setTimeout(() => resolve(this.books), 3000); // here your async db call or anything else
    });
  }
}
```
```JavaScript
var express = require('express');
var easyRest = require('express-easy-rest');
var myApp = require('./lib/app');
var middleware  = easyRest.middleware(myApp);

express()
  .use('/api', middleware)
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
