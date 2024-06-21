"use client";

import React from "react";
import { useController } from "react-hook-form";
import { Label } from "../ui/label";
import { Switch as SwitchShad } from "@/components/ui/switch";

interface SwitchProps {
  name: string;
  control: any;
  label: string;
  required?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  name,
  control,
  label,
  required = false,
}) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
      <Label className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <SwitchShad
          checked={value}
          onCheckedChange={onChange}
          id={name}
          className="mr-2"
        />
      </div>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default Switch;
