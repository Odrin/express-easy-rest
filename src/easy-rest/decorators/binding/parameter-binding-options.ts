import {BindingType} from "./binding-type";

export interface IParameterBindingOptions {
  bindingType: BindingType;
  /**
   * Index of the parameter in action
   */
  parameterIndex: number;
  /**
   * Action parameter data type
   */
  dataType: any;
  /**
   * Source object property key. The entire source object if not specified.
   */
  propertyKey?: string;
}
