import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputNumberRupiah } from "@/feature/_global/components/InputNumberRupiah";

export function Step3CreateOrder({ control }: { control: any }) {
  const { control: formControl } = control;

  return (
    <FormField
      control={formControl}
      name="inputPayment"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <InputNumberRupiah
              value={field.value}
              setValue={field.onChange}
              namingText="Input Pembayaran"
              className=""
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
