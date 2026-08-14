"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";

export function OptionCategory({
  value,
  setValue,
  namingText,
  className,
  includeAll = true,
}: {
  value: string;
  setValue: (value: string) => void;
  namingText: string;
  className?: string;
  includeAll?: boolean;
}) {
  const { data: categories = [] } = useCategories();

  function handleChange(newValue: string | null) {
    if (newValue !== null) {
      setValue(newValue);
    }
  }

  return (
    <div className={`relative ${className || ""}`}>
      {namingText && (
        <p className="absolute -top-1.25 px-2 left-2 bg-white font-bold text-xs z-10">
          {namingText}
        </p>
      )}

      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className={`${className || ""} py-5`}>
          <SelectValue placeholder="Pilih Kategori" />
        </SelectTrigger>

        <SelectContent className="top-12 z-50">
          {includeAll && <SelectItem value="all">Semua Kategori</SelectItem>}
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name || cat.categoryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
