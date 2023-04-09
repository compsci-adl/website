import type { ReactNode } from "react";

type FormProps = JSX.IntrinsicElements["form"];
type InputProps = JSX.IntrinsicElements["input"] & {
    inputClassName?: string;
    labelTitle?: string;
};

export function Form({ className, ...props }: FormProps) {
    return (
        <form>

        </form>
    );
}

export function TextInput({
    className, inputClassName, labelTitle, required, placeholder, ...props }: InputProps) {
    return (
        <label className={`flex flex-col grow gap-1 ${className ?? ""}`}>
            <span>
                {labelTitle}
            </span>
            <input
                type="text"
                required={required}
                placeholder={placeholder}
                className={`w-full grow border-b-2 focus:outline-none focus:border-[#000] py-2 ${inputClassName ?? ""}`}
            />
        </label>
    );
}

export function CheckboxInput({ className, inputClassName, labelTitle, ...props }: InputProps) {
    return (
        <label className={`flex flex-row flex-1 gap-4 ${className ?? ""}`}>
            <div>
                <input
                    type="checkbox"
                    className={`w-5 h-5 border-b focus:outline-none focus:border-[#000] ${inputClassName ?? ""}`}
                />
            </div>
            <span>
                {labelTitle}
            </span>
        </label>
    );
}
