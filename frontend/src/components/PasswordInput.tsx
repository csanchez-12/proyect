import React, { useState, useId } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface Props {
    label?: string
    placeholder?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    maxLength?: number
}

export default function PasswordInput({
    label,
    placeholder,
    value,
    onChange,
    maxLength,
}: Props) {
    const id = useId()
    const [show, setShow] = useState(false)

    return (
        <div className='flex flex-col mt-5'>
            {label && <label className='font-bold' htmlFor={id}>{label}</label>}
            <div className='flex items-center border border-gray-300 p-3 rounded-xl gap-3 focus-within:border-primary transition-colors'>
                <input
                    id={id}
                    type={show ? 'text' : 'password'}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    value={value}
                    onChange={onChange}
                    className='w-full focus:outline-none'
                />
                <button type='button' onClick={() => setShow((s) => !s)} className='text-gray-500'>
                    {show ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
        </div>
    )
}
