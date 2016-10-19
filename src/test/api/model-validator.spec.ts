import "reflect-metadata";
import {ModelValidator} from "../../easy-rest/api/validation/model-validator";
import {Required} from "../../easy-rest/decorators/validation/required";
import {StringLength} from "../../easy-rest/decorators/validation/string-length";

class EmptyModel {}
class ValidateModel {
  @Required()
  required: string;
  @StringLength(5)
  string: string;
}

describe('ModelValidator spec', () => {
  let validator: ModelValidator;

  beforeEach(() => validator = new ModelValidator());

  describe('canValidate method', () => {
    it('should return false if no validators metadata', () => {
      let canValidate = validator.canValidate(EmptyModel);

      expect(canValidate).toBeFalsy();
    });

    it('should return true if has validators metadata', () => {
      let canValidate = validator.canValidate(ValidateModel);

      expect(canValidate).toBeTruthy();
    });
  });

  describe('validate method', () => {
    it('should return false if model is not valid', () => {
      let model = new ValidateModel();
      model.string = '123456';

      let result = validator.validate(model, ValidateModel);

      expect(result.valid).toBeFalsy();
    });

    it('should return true if model is valid', () => {
      let model = new ValidateModel();
      model.required = 'required';
      model.string = '12345';

      let result = validator.validate(model, ValidateModel);

      expect(result.valid).toBeTruthy();
    });
  });
});
