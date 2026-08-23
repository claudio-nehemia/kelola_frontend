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
}: {
  value: string;
  setValue: (value: string) => void;
  namingText: string;
  className?: string;
}) {
  const { data: options } = useGetCategoryProduct();

  const defaultOption = { id: "all", name: "Semua Kategori" };

  const selectCategory = [defaultOption, ...(options || [])];

  function handleChange(newValue: string | null) {
    if (newValue !== null) {
      setValue(newValue);
    }
  }

  return (
    <div className={`relative`}>
      <p className="absolute -top-1.25 px-2 left-2 bg-white font-bold text-xs">
        {namingText}
      </p>

      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className={`py-5 ${className}`}>
          <SelectValue placeholder="Pilih Kategori">
            {selectCategory.find((val) => val.id === value)?.name}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="p-1.5">
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
