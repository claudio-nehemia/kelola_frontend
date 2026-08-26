import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchProduct({
  value,
  setValue,
  active,
  setActive,
  className = "",
}: {
  value: string;
  setValue: (value: string) => void;
  active?: boolean;
  setActive?: (value: boolean) => void;
  className?: string;
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="text-gray-500 absolute left-4 z-10" size={18} />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setActive && setActive(true)}
        onBlur={() => {
          // small timeout to allow clicking suggestion items
          setTimeout(() => {
            if (setActive) setActive(false);
          }, 200);
        }}
        placeholder="Cari produk kamu..."
        className="w-full border-2 pl-11 h-10 rounded-md"
      />
    </div>
  );
}
