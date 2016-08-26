import {IParameterBindingOptions} from "../decorators/binding/parameter-binding-options";

export class HttpActionDescriptor {
  actionName: string;
  bindings: IParameterBindingOptions[];
  returnType: any;
}
