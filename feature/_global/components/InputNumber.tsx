import { Input } from "@/components/ui/input";

export function InputNumber({
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
  return (
    <div className={`relative ${className}`}>
      <h1 className="absolute -top-1.5 text-xs font-bold left-3 bg-white px-1">
        {namingText}
      </h1>
      <Input
        type="number"
        value={value}
        onChange={function (e) {
          setValue(Number(e.target.value));
        }}
        placeholder={`Masukkan ${namingText}`}
        className={`p-5`}
      />
    </div>
  );
}
