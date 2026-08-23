import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function StatusManageProduct({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  function handleChange(newValue: string | null) {
    if (newValue !== null) {
      setValue(newValue);
    }
  }

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "tersedia", label: "Tersedia" },
    { value: "tidak_tersedia", label: "Tidak Tersedia" },
  ];

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger
        className={cn(`
        ${value === "tidak_tersedia" && "border-red-500 text-red-500 border-2"}
        ${value === "tersedia" && "border-green-500 text-green-500 border-2"}
        ${value === "all" && "border-gray-500 text-gray-500"}
      `)}
      >
        <SelectValue
          placeholder="Semua Status"
          className={cn(`
        ${value === "tidak_tersedia" && "border-red-500 text-red-500 text-lg"}
        ${value === "tersedia" && "border-green-500 text-green-500 text-lg"}
        ${value === "all" && "border-gray-500 text-gray-500 text-lg"}
      `)}
        >
          {statusOptions.find((opt) => opt.value === value)?.label}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
