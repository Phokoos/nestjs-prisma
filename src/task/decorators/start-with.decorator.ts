import {
  registerDecorator,
  type ValidatorOptions,
  type ValidationArguments,
} from 'class-validator';

export function StartWith(
  prefix: string,
  validationOptions?: ValidatorOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'startsWith',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments): string {
          return `The ${propertyName} must start with ${prefix}`;
        },
      },
    });
  };
}
