'use client';

import React from "react";
import { UseFormRegister, FieldErrors, useController } from "react-hook-form";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Input } from "../ui/input";

interface RadioProps {
  name: string;
  label: string;
  required: boolean;
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  control: any;
}

const Radio: React.FC<RadioProps> = ({
  name,
  required,
  label,
  options,
  defaultValue,
  control,
}) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <div>
      <label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex gap-3">
        <RadioGroup value={value} onValueChange={onChange} className="flex items-center gap-3">
          {options.map((item) => (
            <div key={item.value} className="flex gap-2">
              <RadioGroupItem
                value={item.value}
                id={`${name}-${item.value}`}
              />
              <Label htmlFor={`${name}-${item.value}`}>
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default Radio;
