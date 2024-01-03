import {z, ZodError} from 'zod';

type FieldValidator = z.ZodString;

const validateFields = async (
    fields: string[], schemas: FieldValidator[],
    setErrors: React.Dispatch<React.SetStateAction<string|null>>[],
    nextStep: () => void) => {
  const errors: string[] = [];

  fields.forEach((field, index) => {
    try {
      schemas[index].parse(field);

      // If no error, push an empty string
      errors.push('');
    } catch (error) {
      // If error, push the list of errors
      if (error instanceof ZodError) {
        errors.push(error.errors[0].message);
      } else {
        errors.push('An unknown error occurred');
      }
    }
  });

  // Set errors for each field
  setErrors.forEach((setError, index) => {
    setError(errors[index]);
  });

  // Proceed to the next step if there are no errors
  if (errors.every((err) => !err)) {
    nextStep();
  }
};

export default validateFields;
