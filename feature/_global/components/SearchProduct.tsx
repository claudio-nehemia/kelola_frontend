import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchProduct({
  value,
  setValue,
  className = "",
}: {
  value: string;
  setValue: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`relative flex items-center w-full max-w-md ${className}`}>
      <Search className="text-gray-500 absolute left-4 z-10" size={18} />
      <Input
        value={value}
        onChange={function (e) {
          setValue(e.target.value);
        }}
        placeholder="Cari produk kamu..."
        className="w-full border-2 pl-11 h-10 rounded-md"
      />
    </div>
  );
}
