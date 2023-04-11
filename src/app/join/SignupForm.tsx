type InputProps = JSX.IntrinsicElements['input'] & {
    inputClassName?: string;
    labelTitle?: string;
};

export function TextInput({
    className,
    inputClassName,
    labelTitle,
    required,
    placeholder,
}: InputProps) {
    return (
        <label className={`flex grow flex-col gap-1 ${className ?? ''}`}>
            <span>{labelTitle}</span>
            <input
                type="text"
                required={required}
                placeholder={placeholder}
                className={`w-full grow border-b-2 py-2 focus:border-[#000] focus:outline-none ${
                    inputClassName ?? ''
                }`}
            />
        </label>
    );
}

export function CheckboxInput({ className, inputClassName, labelTitle }: InputProps) {
    return (
        <label className={`flex flex-1 flex-row gap-4 ${className ?? ''}`}>
            <div>
                <input
                    type="checkbox"
                    className={`h-5 w-5 border-b focus:border-[#000] focus:outline-none ${
                        inputClassName ?? ''
                    }`}
                />
            </div>
            <span>{labelTitle}</span>
        </label>
    );
}
