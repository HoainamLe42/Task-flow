import React, { useState } from 'react';

interface InputProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCustom: React.FC<InputProps> = ({
    label,
    type = 'text',
    value,
    onChange,
}) => {
    return (
        <div className="relative border border-gray-300 rounded-lg h-12 flex items-center">
            {/* <label className="absolute top-1/2 left-1/2 transform -translate-x-1/2">\ */}
            <label
                className={`absolute left-4 text-gray-500 capitalize transition-all duration-200 ${
                    value
                        ? 'top-1 text-xs text-blue-500'
                        : 'top-1/2 -translate-y-1/2'
                }`}
            >
                {label}
            </label>
            <input
                type={type}
                name={label}
                value={value}
                onChange={onChange}
                className={`w-full h-full rounded-lg px-4 ${
                    value ? 'pt-2' : ''
                } focus:outline-none`}
            />
        </div>
    );
};

export default InputCustom;
