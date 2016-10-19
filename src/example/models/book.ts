import {Required} from "../../index";

export class Book {
  @Required()
  id: number;
  @Required()
  name: string;
}
