import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'cnicFormat', async: false })
export class CNICFormatConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    // CNIC format validation regex
    const cnicRegex = /^\d{5}-\d{7}-\d$/;
    return cnicRegex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CNIC must be in the format: 12345-1234567-1';
  }
}

export function CNICFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'cnicFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CNICFormatConstraint,
    });
  };
}
