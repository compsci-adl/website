import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import Field, { FieldProps } from './Field';

interface ControlledFieldProps<TFieldValues extends FieldValues>
    extends Omit<FieldProps, 'value' | 'onChange' | 'error'> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
}

/**
 * `Field` controlled by react hook form
 */
const ControlledField = <TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    ...props
}: ControlledFieldProps<TFieldValues>) => {
    const { field, fieldState } = useController({ control, name });

    return (
        <Field
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            {...props}
        />
    );
};

export default ControlledField;
