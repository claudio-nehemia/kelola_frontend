import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchProduct({
  value,
  setValue,
  active,
  setActive,
  className,
}: {
  value: string;
  setValue: (value: string) => void;
  active: boolean;
  setActive: (value: boolean) => void;
  className?: string;
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="text-gray-500 absolute left-6" size={18} />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        placeholder="Cari produk kamu..."
        className="border-2 pl-13 h-10"
      />
    </div>
  );
}
