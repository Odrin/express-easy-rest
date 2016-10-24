/// <reference types="express" />
import { Request } from "express";
import { IParameterBindingOptions } from "../decorators/binding/parameter-binding-options";
import { BindingType } from "../decorators/binding/binding-type";
import { ModelValidator } from "./validation/model-validator";
export declare class DataBinder {
    private bindings;
    private validator;
    constructor(bindings: IParameterBindingOptions[], validator: ModelValidator);
    getParameters(req: Request): any[];
    static convertValue(value: any, dataType: any): any;
    static getBindingValue(source: any, propertyKey?: string): any;
    static getBindingSource(req: Request, bindingType: BindingType): any;
}
