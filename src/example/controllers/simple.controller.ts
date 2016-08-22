import {
  ApiController,
  Controller,
  Action,
  FromRoute,
  Get
} from "../../index";

@Controller({basePath: '/simple'})
export class SimpleController extends ApiController {

  constructor() {
    super();
  }

  @Action({method: 'get', path: '/hello/:name'})
  hello(@FromRoute('name')name: string): string {
    return `Hello ${name}`;
  }

  @Get('/object')
  getObject(@FromRoute('name')name: string): Object {
    return {
      field: 'some object field'
    };
  }

  @Get('/error')
  getError() {
    throw new Error('My test error');
  }
}
