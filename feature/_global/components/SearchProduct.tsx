import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchProduct({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="relative flex items-center">
      <Search className="text-gray-500 absolute left-6" size={18} />
      <Input
        value={value}
        onChange={function (e) {
          setValue(e.target.value);
        }}
        placeholder="Cari produk kamu..."
        className="w-150 border-2 pl-13 h-10"
      />
    </div>
  );
}
