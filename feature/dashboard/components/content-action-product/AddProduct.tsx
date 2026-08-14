"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddProductSchema, validationAddProduct } from "@/schema/validation-add-product";
import { FunnelPlus, SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { InputText } from "@/feature/_global/components/InputText";
import { OptionCategory } from "@/feature/_global/components/OptionCategory";
import { InputNumber } from "@/feature/_global/components/InputNumber";
import { useCreateProduct, useUpdateProduct, ProductItem } from "@/hooks/useProducts";

export function AddProduct({
  mode,
  initialData,
  className,
}: {
  mode: "add" | "edit";
  initialData?: ProductItem;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  const form = useForm<validationAddProduct>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      productName: initialData?.name || initialData?.productName || "",
      priceSell: initialData?.sellPrice || initialData?.priceSell || 0,
      cleanProfit: initialData?.cleanProfit || 0,
      stock: initialData?.stock || 0,
      category: initialData?.categoryId || initialData?.category?.id || "",
    },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (initialData) {
      reset({
        productName: initialData.name || initialData.productName || "",
        priceSell: initialData.sellPrice || initialData.priceSell || 0,
        cleanProfit: initialData.cleanProfit || (initialData.sellPrice - initialData.costPrice) || 0,
        stock: initialData.stock || 0,
        category: initialData.categoryId || initialData.category?.id || "",
      });
    }
  }, [initialData, reset]);

  async function onSubmit(data: validationAddProduct) {
    setErrorMessage("");
    try {
      if (mode === "add") {
        await createProductMutation.mutateAsync(data);
      } else if (mode === "edit" && initialData?.id) {
        await updateProductMutation.mutateAsync({ id: initialData.id, payload: data });
      }
      reset();
      setIsOpen(false);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || "Gagal menyimpan produk");
    }
  }

  const isPending = createProductMutation.isPending || updateProductMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {mode === "add" && (
        <DialogTrigger render={<Button className={`px-7 py-5 ${className || ""}`} />}>
          <FunnelPlus />
          <p>Tambah Produk</p>
        </DialogTrigger>
      )}

      {mode === "edit" && (
        <DialogTrigger render={<Button className={`px-4 py-2 ${className || ""}`} />}>
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
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
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
                      setValue={(val) => field.onChange(Number(val))}
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
                      setValue={(val) => field.onChange(Number(val))}
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
                        includeAll={false}
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
                        setValue={(val) => field.onChange(Number(val))}
                        namingText="Jumlah Stok"
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <Button className="w-full mt-4" type="submit" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
