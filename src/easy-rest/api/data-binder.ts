import {Request} from "express";
import {IParameterBindingOptions} from "../decorators/binding/parameter-binding-options";
import {BindingType} from "../decorators/binding/binding-type";
import {ModelValidator} from "./model-validator";
import {ModelValidationError} from "../exceptions/model-validation-error";

export class DataBinder {
  constructor(private bindings: IParameterBindingOptions[], private validator: ModelValidator) {
  }

  getParameters(req: Request): any[] {
    let parameters: any[] = [];

    for (let i = 0; i < this.bindings.length; i++) {
      let binding = this.bindings[i];
      let source = DataBinder.getBindingSource(req, binding.bindingType) || {};
      let value = DataBinder.getBindingValue(source, binding.propertyKey);

      if (this.validator.canValidate(binding.dataType)) {
        if (!this.validator.isValid(value, binding.dataType)) {
          //TODO: validation exception
          throw new ModelValidationError(binding.propertyKey, value);
        }
      }

      parameters[binding.parameterIndex] = DataBinder.convertValue(value, binding.dataType);
    }

    return parameters;
  }

  static convertValue(value: any, dataType: any): any {
    if (dataType === String) {
      return value.toString();
    }

    if (dataType === Number) {
      return +value;
    }

    if (dataType === Boolean) {
      return !!value;
    }

    return value;
  }

  static getBindingValue(source: any, propertyKey?: string): any {
    if (!propertyKey) {
      return source;
    }
    else {
      return source[propertyKey];
    }
  }

  static getBindingSource(req: Request, bindingType: BindingType): any {
    switch (bindingType) {
      case BindingType.body:
        return req.body;

      case BindingType.route:
        return req.params;

      default:
        throw new Error(`Unsupported binding type: ${bindingType}`);
    }
  }
}
