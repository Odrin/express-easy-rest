import {Controller} from "../../easy-rest/controller/controller";
import {controller} from "../../easy-rest/decorators/controller/controller";
import {action} from "../../easy-rest/decorators/action/action";
import {fromRoute} from "../../easy-rest/decorators/binding/from-route";
import {get} from "../../easy-rest/decorators/action/get";

@controller({basePath: '/simple'})
export class SimpleController extends Controller {

  constructor() {
    super();
  }

  @action({method: 'get', path: '/hello/:name'})
  hello(@fromRoute('name')name: string): string {
    return `Hello ${name}`;
  }

  @get('/object')
  getObject(@fromRoute('name')name: string): Object {
    return {
      field: 'some object field'
    };
  }

  @get('/error')
  getError() {
    throw new Error('My test error');
  }
}
