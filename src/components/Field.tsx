import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

interface FieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    type?: string;
    options?: string[];
}

const Field = ({ label, value, onChange, error, type = 'text', options = [] }: FieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCheckboxChange = (option: string) => {
        const updatedValues = value.includes(option)
            ? value
                  .split(',')
                  .filter((item) => item !== option)
                  .join(',')
            : `${value},${option}`;
        onChange(updatedValues);
    };

    return (
        <div className="mb-4">
            <label htmlFor={label.toLowerCase()} className="block">
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
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : type === 'checkbox' ? (
                <div>
                    {options.map((option, index) => (
                        <div key={index} className="mb-2">
                            <label>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={value.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                />{' '}
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative">
                    <input
                        onChange={(e) => onChange(e.target.value)}
                        id={label.toLowerCase()}
                        name={label.toLowerCase()}
                        value={value}
                        type={showPassword ? 'text' : type}
                        className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
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
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
    );
};

export default Field;
