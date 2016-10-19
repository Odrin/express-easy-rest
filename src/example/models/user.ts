import {Required, StringLength} from "../../index";

export class User {
  @Required()
  login: string;
  @Required()
  @StringLength(Infinity, 5)
  pwd: string;
}
