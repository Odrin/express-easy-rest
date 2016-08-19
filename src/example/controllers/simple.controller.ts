import {ApiController} from "../../easy-rest/controller/controller";
import {Controller} from "../../easy-rest/decorators/controller/controller";
import {Action} from "../../easy-rest/decorators/action/action";
import {FromRoute} from "../../easy-rest/decorators/binding/from-route";
import {Get} from "../../easy-rest/decorators/action/get";

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
