"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from "react";

export function InputNumber({
  value,
  setValue,
  namingText,
  className = "",
}: {
  value: number | string;
  setValue: (value: number) => void;
  namingText: string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState<string>(
    value === 0 || value === "" || value === undefined ? "" : String(value)
  );

  useEffect(() => {
    if (value === 0 && displayValue === "") return;
    setDisplayValue(
      value === undefined || value === null || value === 0 ? "" : String(value)
    );
  }, [value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const rawVal = e.target.value;
    if (rawVal === "") {
      setDisplayValue("");
      setValue(0);
      return;
    }

    const cleanDigits = rawVal.replace(/[^0-9]/g, "");
    if (cleanDigits === "") {
      setDisplayValue("");
      setValue(0);
    } else {
      const num = parseInt(cleanDigits, 10);
      setDisplayValue(String(num));
      setValue(num);
    }
  }

  return (
    <div className={`relative ${className}`}>
      {namingText && (
        <h1 className="absolute -top-2 text-xs font-bold left-3 bg-white px-1 z-10">
          {namingText}
        </h1>
      )}
      <Input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        placeholder="0"
        className="p-5 h-10 border-2"
      />
    </div>
  );
}
