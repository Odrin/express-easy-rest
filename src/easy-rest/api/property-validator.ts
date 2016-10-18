export interface IPropertyValidator {
  propertyKey: string | symbol;
  validate(value: any): boolean;
}
