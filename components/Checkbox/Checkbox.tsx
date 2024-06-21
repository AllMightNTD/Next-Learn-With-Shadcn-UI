'use client';

import React from "react";
import { useController } from "react-hook-form";
import { Label } from "../ui/label";
import { Checkbox as CheckBoxShad } from "@/components/ui/checkbox"

interface CheckboxGroupProps {
  name: string;
  control: any;
  label: string;
  required?: boolean;
  options: {
    label: string;
    value: string;
  }[];
}

const Checkbox: React.FC<CheckboxGroupProps> = ({
  name,
  control,
  label,
  required = false,
  options,
}) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const handleChange = (selectedValue : number | string) => {
    const newValue = value.includes(selectedValue)
      ? value.filter((v : number | string) => v !== selectedValue)
      : [...value, selectedValue];
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="flex flex-col gap-2 mt-2">
        {options.map((item) => (
          <Label key={item.value} className="flex items-center">
            <CheckBoxShad
              checked={value.includes(item.value)}
              onCheckedChange={() => handleChange(item.value)}
              id={`${name}-${item.value}`}
              className="mr-2"
            />
            {item.label}
          </Label>
        ))}
      </div>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default Checkbox;
