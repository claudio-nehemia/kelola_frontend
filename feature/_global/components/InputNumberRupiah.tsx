"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from "react";

export function InputNumberRupiah({
  value,
  setValue,
  namingText,
  className = "",
}: {
  value: number;
  setValue: (value: number) => void;
  namingText: string;
  className?: string;
}) {
  const formatDisplay = (num: number) => {
    if (!num || isNaN(num) || num === 0) return "";
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const [displayValue, setDisplayValue] = useState<string>(formatDisplay(value));

  useEffect(() => {
    if (value === 0 && displayValue === "") return;
    setDisplayValue(formatDisplay(value));
  }, [value]);

  function handleInputRupiah(e: ChangeEvent<HTMLInputElement>) {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    if (rawVal === "") {
      setDisplayValue("");
      setValue(0);
      return;
    }

    const num = parseInt(rawVal, 10);
    if (isNaN(num)) {
      setDisplayValue("");
      setValue(0);
    } else {
      setDisplayValue(new Intl.NumberFormat("id-ID").format(num));
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

      <p className="absolute left-3 top-2.5 text-sm font-semibold text-gray-500 z-10">
        Rp
      </p>
      <Input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleInputRupiah}
        placeholder="0"
        className="p-5 pl-10 h-10 border-2"
      />
    </div>
  );
}
