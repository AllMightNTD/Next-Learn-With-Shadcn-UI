'use client';

import React from 'react';
import { useController } from 'react-hook-form';
import { Input as InputShad } from '../ui/input';
import { Label } from '../ui/label';

interface InputProps {
    label: string;
    name: string;
    control: any;
    type:string;
    placeholder:string
    required?:boolean
}
const Input:React.FC<InputProps> = ({ label, name, control , type = "text" , placeholder , required }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control
  });

  return (
    <div className="mb-4">
      {label &&  <Label>{label} {required  && <span className='text-red-500'>*</span>}</Label>}
      <InputShad
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        ref={ref}
        type={type}
        className="w-full px-3 py-2 border rounded-md"
        placeholder={placeholder}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default Input;
