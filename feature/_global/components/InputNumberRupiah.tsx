import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

export function InputNumberRupiah({
  value,
  setValue,
  namingText,
  className,
}: {
  value: number;
  setValue: (value: number) => void;
  namingText: string;
  className?: string;
}) {
  const formatNumber = (val: number) => {
    if (!val || isNaN(val)) return "";
    return new Intl.NumberFormat("id-ID").format(val);
  };

  function handleInputRupiah(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(inputValue, 10);
    setValue(isNaN(numericValue) ? 0 : numericValue);
  }

  return (
    <div className={`relative ${className}`}>
      <h1 className="absolute -top-1.5 text-xs font-bold left-3 bg-white px-1">
        {namingText}
      </h1>

      <p className="absolute left-3 top-3 text-sm">Rp</p>
      <Input
        type="text"
        value={formatNumber(value)}
        onChange={handleInputRupiah}
        placeholder={`Masukkan ${namingText}`}
        className={`p-5 pl-10`}
      />
    </div>
  );
}
