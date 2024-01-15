import { z, ZodError } from 'zod';

type FieldValidator = z.ZodString;

const validateFields = (
    fields: string[],
    schemas: FieldValidator[],
    setErrors: React.Dispatch<React.SetStateAction<string | null>>[]
): boolean => {
    const errors: string[] = [];

    fields.forEach((field, index) => {
        try {
            schemas[index].parse(field);
            errors.push('');
        } catch (error) {
            if (error instanceof ZodError) {
                errors.push(error.errors[0].message);
            } else {
                errors.push('An unknown error occurred');
            }
        }
    });

    setErrors.forEach((setError, index) => {
        setError(errors[index]);
    });

    return errors.every((err) => !err);
};

export default validateFields;
