import { BindingType } from "./binding-type";
export interface IParameterBindingOptions {
    bindingType: BindingType;
    parameterIndex: number;
    dataType: any;
    propertyKey?: string;
}
