import { ChangeEvent, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export interface FieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    type?: 'text' | 'password' | 'select' | 'checkbox';
    options?: string[];
    placeholder?: string;
}

const Field = ({
    label,
    value,
    onChange,
    error,
    type = 'text',
    options = [],
    placeholder,
}: FieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked ? 'Yes' : 'No');
    };

    return (
        <div className="mb-4">
            <label htmlFor={label.toLowerCase()} className="block text-lg md:text-base">
                {label}
            </label>
            {type === 'select' ? (
                <select
                    onChange={(e) => onChange(e.target.value)}
                    id={label.toLowerCase()}
                    name={label.toLowerCase()}
                    value={value}
                    className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : type === 'checkbox' ? (
                <div className="mt-4 mb-2">
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
            ) : (
                <div className="relative">
                    <input
                        onChange={(e) => onChange(e.target.value)}
                        id={label.toLowerCase()}
                        name={label.toLowerCase()}
                        value={value}
                        type={showPassword ? 'text' : type}
                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1 rounded-none"
                    />
                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-4 right-6"
                        >
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                        </button>
                    )}
                </div>
            )}
            {error && <div className="text-red-500 text-sm mt-2 w-[25rem]">{error}</div>}
        </div>
    );
};

export default Field;
