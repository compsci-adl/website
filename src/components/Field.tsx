import React from 'react';

interface FieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
}

const Field = ({ label, value, onChange, error }: FieldProps) => {
    return (
        <div className="mb-4">
            <label htmlFor={label.toLowerCase()} className="block">
                {label}
            </label>
            <input
                onChange={(e) => onChange(e.target.value)}
                id={label.toLowerCase()}
                name={label.toLowerCase()}
                value={value}
                type="text"
                className="border text-grey border-gray-300 px-3 py-2 w-full mt-1"
            />
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
    );
};

export default Field;
