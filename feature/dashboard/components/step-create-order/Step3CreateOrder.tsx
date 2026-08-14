"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { InputNumberRupiah } from "@/feature/_global/components/InputNumberRupiah";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { Banknote, QrCode, CreditCard } from "lucide-react";

export function Step3CreateOrder({ control }: { control: any }) {
  const { control: formControl, watch, setValue } = control;

  const formValues = watch();
  const items = formValues.listItemProduct || [];
  const currentPaymentMethod = formValues.paymentMethod || "Cash";

  const totalAmount = items.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const paymentMethods = [
    { id: "Cash", name: "Tunai (Cash)", icon: Banknote },
    { id: "QRIS", name: "QRIS", icon: QrCode },
    { id: "Transfer", name: "Transfer Bank", icon: CreditCard },
  ];

  return (
    <div className="w-full space-y-5 py-2">
      {/* Total Amount Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-center">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
          Total Tagihan
        </p>
        <p className="text-2xl font-extrabold text-blue-700 mt-1">
          {formatRupiah(totalAmount)}
        </p>
      </div>

      {/* Payment Method Selector */}
      <FormField
        control={formControl}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem className="w-full space-y-2">
            <FormLabel className="font-bold text-sm text-gray-700">
              Pilih Metode Pembayaran
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = field.value === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        field.onChange(method.id);
                        if (method.id !== "Cash") {
                          setValue("inputPayment", totalAmount);
                        }
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1 ${isSelected ? "text-blue-600" : "text-gray-500"}`} />
                      <span className="text-xs">{method.name}</span>
                    </button>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Payment Amount Input */}
      <FormField
        control={formControl}
        name="inputPayment"
        render={({ field }) => (
          <FormItem className="w-full space-y-2">
            <FormControl>
              <InputNumberRupiah
                value={field.value}
                setValue={field.onChange}
                namingText="Jumlah Pembayaran / Diterima"
                className="w-full"
              />
            </FormControl>

            {/* Quick Amount Suggestion Buttons */}
            {currentPaymentMethod === "Cash" && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => field.onChange(totalAmount)}
                  className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 border rounded font-semibold text-gray-700 cursor-pointer"
                >
                  Uang Pas ({formatRupiah(totalAmount)})
                </button>
                {[10000, 20000, 50000, 100000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => field.onChange(amt)}
                    className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 border rounded text-gray-700 cursor-pointer"
                  >
                    {formatRupiah(amt)}
                  </button>
                ))}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
