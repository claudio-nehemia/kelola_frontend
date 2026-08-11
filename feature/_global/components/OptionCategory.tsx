import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const options = [
    { id: "option1", label: "Option 1" },
    { id: "option2", label: "Option 2" },
    { id: "option3", label: "Option 3" },
  ];

  function handleChange(newValue: string | null) {
    if (newValue !== null) {
      setValue(newValue);
    }
  }

  return (
    <div className={`relative ${className}`}>
      <p className="absolute -top-1.25 px-2 left-2 bg-white font-bold text-xs">
        {namingText}
      </p>

      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className={`${className} py-5`}>
          <SelectValue placeholder="Pilih Kategori" />
        </SelectTrigger>

        <SelectContent className="top-12">
          {options.map((opt) => (
            <SelectItem key={opt.id} value={opt.id}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
