import { Request } from "express";
import { IParameterBindingOptions } from "../decorators/binding/parameter-binding-options";
import { BindingType } from "../decorators/binding/binding-type";
export declare class DataBinder {
    private req;
    private bindings;
    constructor(req: Request, bindings: IParameterBindingOptions[]);
    getParameters(): any[];
    convertValue(value: any, dataType: any): any;
    getBindingValue(source: any, propertyKey?: string): any;
    getBindingSource(bindingType: BindingType): any;
    getParameterBinding(parameterIndex: number): IParameterBindingOptions;
}
