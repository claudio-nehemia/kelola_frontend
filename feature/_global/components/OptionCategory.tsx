"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoryProduct } from "@/feature/dashboard/action/useGetCategoryProduct";

export function OptionCategory({
  value,
  setValue,
  namingText,
  className,
  includeAll = true,
}: {
  value: string;
  setValue: (value: string) => void;
  namingText?: string;
  className?: string;
  includeAll?: boolean;
}) {
  const { data: options = [] } = useGetCategoryProduct();

  const selectCategory = includeAll
    ? [{ id: "all", name: "Semua Kategori" }, ...(options || [])]
    : options || [];

  function handleChange(newValue: string | null) {
    if (newValue !== null) {
      setValue(newValue);
    }
  }

  const selectedItem = selectCategory.find((val) => val.id === value);

  return (
    <div className={`relative ${className || ""}`}>
      {namingText && (
        <p className="absolute -top-1.25 px-2 left-2 bg-white font-bold text-xs z-10">
          {namingText}
        </p>
      )}

      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className={`py-5 ${className || ""}`}>
          <SelectValue placeholder="Pilih Kategori">
            {selectedItem?.name || "Pilih Kategori"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="p-1.5 z-50">
          {selectCategory.map((opt) => (
            <SelectItem key={opt.id} value={opt.id}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
