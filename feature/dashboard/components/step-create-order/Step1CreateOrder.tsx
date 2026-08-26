import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputText } from "@/feature/_global/components/InputText";

export function Step1CreateOrder({ control }: { control: any }) {
  const { control: formControl } = control;
  return (
    <FormField
      control={formControl}
      name="namaCustomer"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <InputText
              value={field.value}
              setValue={field.onChange}
              namingText="Nama Customer"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
