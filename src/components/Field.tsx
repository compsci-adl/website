import type { ChangeEvent, ReactNode } from 'react';
import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export interface FieldProps {
    label: string | ReactNode;
    value: string | boolean;
    onChange: (value: string) => void;
    error?: string | null;
    type?: 'text' | 'password' | 'select' | 'checkbox' | 'toggle';
    options?: readonly string[] | string[];
    placeholder?: string;
    longLabel?: string;
}

const Field = ({
    label,
    value,
    onChange,
    error,
    type = 'text',
    options = [],
    placeholder,
    longLabel,
}: FieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked ? 'Yes' : 'No');
    };

    const labelString = typeof label === 'string' ? label.toLowerCase() : ''; // Ensure label is a string for attributes

    return (
        <div className="mb-4">
            <label htmlFor={labelString} className="block text-lg md:text-base">
                {label}
            </label>
            {type === 'select' ? (
                <select
                    value={typeof value === 'string' ? value : ''}
                    onChange={(e) => onChange(e.target.value)}
                    id={labelString}
                    name={labelString}
                    className="mt-1 w-full border border-gray-300 px-3 py-2 text-grey"
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : type === 'checkbox' ? (
                <div className="mb-2 mt-4">
                    <label>
                        <input
                            type="checkbox"
                            checked={value === 'Yes'}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />{' '}
                        Yes
                    </label>
                </div>
            ) : type === 'toggle' ? (
                <div className="mb-2 mt-4">
                    <label className="relative flex cursor-pointer flex-row items-center">
                        <button
                            type="button"
                            onClick={() =>
                                handleCheckboxChange({
                                    target: { checked: !value },
                                } as ChangeEvent<HTMLInputElement>)
                            }
                            className={`flex h-7 w-14 cursor-pointer border-2 border-black ${
                                value ? 'bg-orange' : 'bg-gray-300'
                            } transition-all duration-200 ease-in-out`}
                        >
                            <div
                                className={`m-0.5 flex h-5 w-5 transform border-2 border-black bg-white transition-all duration-200 ease-in-out ${
                                    value ? 'translate-x-7' : 'translate-x-0'
                                }`}
                            ></div>
                        </button>
                    </label>
                </div>
            ) : (
                <div className="relative">
                    <input
                        onChange={(e) => onChange(e.target.value)}
                        id={labelString}
                        name={labelString}
                        type={showPassword ? 'text' : type}
                        value={typeof value === 'boolean' ? value.toString() : value}
                        className="mt-1 w-full rounded-none border border-gray-300 px-3 py-2 text-grey"
                    />
                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-6 top-4"
                        >
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                        </button>
                    )}
                </div>
            )}
            {longLabel && !error && <div className="mt-2 text-sm text-gray-500">{longLabel}</div>}
            {error && <div className="mt-2 w-[25rem] text-sm text-red-500">{error}</div>}
        </div>
    );
};

export default Field;
