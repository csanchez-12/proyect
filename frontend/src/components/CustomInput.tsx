import React, { useId } from 'react';

interface Props {
    label?: string;
    type: string;
    placeholder: string;
    maxLength?: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
    text?: string;
}

export default function CustomInput({ label, type, placeholder, maxLength, onChange, value, text }: Props) {
    const id = useId();

    return (
        <div className='flex flex-col mt-5'>
            <label className='font-bold' htmlFor={id}>{label}</label>
            <div className='flex items-center border border-gray-300 overflow-hidden rounded-xl gap-3 focus-within:border-primary transition-colors mt-2'>
                {
                    text
                    &&
                    <div className='text-xs text-black bg-gray-200 h-10 w-15 font-bold flex items-center justify-center border-r border-gray-300'>{text}</div>
                }
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    onChange={onChange}
                    value={value}
                    className='w-full active:border-0 focus:outline-none h-10'
                />
            </div>
        </div>
    );
}