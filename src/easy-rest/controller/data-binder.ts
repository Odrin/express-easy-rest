import {Request} from "express";
import {IParameterBindingOptions} from "../decorators/binding/parameter-binding-options";
import {BindingType} from "../decorators/binding/binding-type";

export class DataBinder {
  constructor(
    private req: Request,
    private bindings: IParameterBindingOptions[]) {

  }

  getParameters(): any[] {
    let parameters: any[] = [];

    for (let i = 0; i < this.bindings.length; i++) {
      let binding = this.bindings[i];
      let source = this.getBindingSource(binding.bindingType) || {};
      let value = this.getBindingValue(source, binding.propertyKey);

      parameters[binding.parameterIndex] = this.convertValue(value, binding.dataType);
    }

    return parameters;
  }

  convertValue(value: any, dataType: any): any {
    if (dataType === String) {
      return value.toString();
    }

    if (dataType === Number) {
      return +value;
    }

    if (dataType === Boolean) {
      return !!value;
    }

    //TODO: input validation
    return value;
  }

  getBindingValue(source: any, propertyKey?: string): any {
    if (!propertyKey) {
      return source;
    }
    else {
      return source[propertyKey];
    }
  }

  getBindingSource(bindingType: BindingType): any {
    switch (bindingType) {
      case BindingType.body:
        return this.req.body;

      case BindingType.route:
        return this.req.params;

      default:
        throw new Error(`Unsupported binding type: ${bindingType}`);
    }
  }

  getParameterBinding(parameterIndex: number): IParameterBindingOptions {
    for (let i = 0; i < this.bindings.length; i++) {
      if (this.bindings[i].parameterIndex === parameterIndex) {
        return this.bindings[i];
      }
    }

    throw new Error(`Parameter binding not found: ${parameterIndex}`);
  }
}
