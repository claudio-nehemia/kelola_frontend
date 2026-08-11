"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddProductSchema } from "@/schema/validation-add-product";
import { FunnelPlus, SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { InputText } from "@/feature/_global/components/InputText";
import { OptionCategory } from "@/feature/_global/components/OptionCategory";
import { InputNumber } from "@/feature/_global/components/InputNumber";

export function AddProduct({
  mode,
  className,
}: {
  mode: "add" | "edit";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      productName: "",
      priceSell: 0,
      cleanProfit: 0,
      stock: 0,
      category: "",
    },
  });

  const { control, handleSubmit } = form;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {mode === "add" && (
        <DialogTrigger render={<Button className={`px-7 py-5 ${className}`} />}>
          <FunnelPlus />
          <p>Tambah Produk</p>
        </DialogTrigger>
      )}

      {mode === "edit" && (
        <DialogTrigger render={<Button className={`px-4 py-2 ${className}`} />}>
          <SquarePen />
          <p>Edit Produk</p>
        </DialogTrigger>
      )}
      <DialogContent className="gap-0.5">
        {mode === "add" && (
          <DialogTitle className="font-bold">Tambah Produk</DialogTitle>
        )}
        {mode === "edit" && (
          <DialogTitle className="font-bold">Edit Produk</DialogTitle>
        )}
        <DialogDescription className="text-sm text-muted-foreground">
          Pastikan informasi produk diisi dengan benar!
        </DialogDescription>

        <Form {...form}>
          <form className="mt-4">
            <div className="space-y-4">
              <FormField
                control={control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <InputText
                      value={field.value}
                      setValue={field.onChange}
                      namingText="Nama Produk"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="priceSell"
                render={({ field }) => (
                  <FormItem>
                    <InputNumber
                      value={field.value}
                      setValue={field.onChange}
                      namingText="Harga Jual"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="cleanProfit"
                render={({ field }) => (
                  <FormItem>
                    <InputNumber
                      value={field.value}
                      setValue={field.onChange}
                      namingText="Keuntungan Bersih"
                    />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <OptionCategory
                        className="w-50"
                        value={field.value}
                        setValue={field.onChange}
                        namingText="Kategori"
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <InputNumber
                        value={field.value}
                        setValue={field.onChange}
                        namingText="Jumlah Stok"
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button className="w-full mt-2" type="submit">
              Simpan
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
