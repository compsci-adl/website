import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

/**
 * Show clerk error message in form.
 * @param error `catch` error
 * @param form `react-hook-form` instance
 * @param clerkErrors possible clerk errors
 */
export const handleClerkErrors = <TFieldValues extends FieldValues>(
    error: any,
    form: UseFormReturn<TFieldValues>,
    clerkErrors: Array<{ code: string; field: FieldPath<TFieldValues>; message: string }>
) => {
    const errorCode: string | undefined = error?.errors[0]?.code;
    if (!errorCode) {
        console.error(error);
        return;
    }
    const clerkError = clerkErrors.find(({ code }) => code === errorCode);
    if (!clerkError) {
        console.error(error);
        return;
    }
    form.setError(clerkError.field, { message: clerkError.message });
};
