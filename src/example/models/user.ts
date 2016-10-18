import {Required} from "../../index";
import {StringLength} from "../../easy-rest/decorators/validation/string-length";

export class User {
  @Required()
  login: string;
  @Required()
  @StringLength(Infinity, 5)
  pwd: string;
}
