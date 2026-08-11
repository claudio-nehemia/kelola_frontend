import { Input } from "@/components/ui/input";

export function InputText({
  value,
  type,
  setValue,
  namingText,
  className,
}: {
  value: string;
  type?: string;
  setValue: (value: string) => void;
  namingText: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <h1 className="absolute -top-1.5 text-xs font-bold left-3 bg-white px-1">
        <span className="text-red-500">*</span>
        {namingText}
      </h1>
      <Input
        type={type || "text"}
        value={value}
        onChange={function (e) {
          setValue(e.target.value);
        }}
        placeholder={`Masukkan ${namingText}`}
        className={`p-5`}
      />
    </div>
  );
}
