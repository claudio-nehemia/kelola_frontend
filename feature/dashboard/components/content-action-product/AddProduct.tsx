"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AddProductSchema,
  validationAddProduct,
} from "@/schema/validation-add-product";
import { FunnelPlus, SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { InputText } from "@/feature/_global/components/InputText";
import { OptionCategory } from "@/feature/_global/components/OptionCategory";
import { InputNumber } from "@/feature/_global/components/InputNumber";
import { useActionAddProduct } from "../../action/useActionAddProduct";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useActionUpdateProduct } from "../../action/useActionUpdateProduct";

export function AddProduct({
  mode,
  className,
  editMode,
}: {
  mode: "add" | "edit";
  className?: string;
  editMode?: {
    productId: string;
    data: validationAddProduct;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<validationAddProduct>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      name: editMode?.data.name || "",
      priceSell: editMode?.data.priceSell || 0,
      profit: editMode?.data.profit || 0,
      stock: editMode?.data.stock || 0,
      categoryId: editMode?.data.categoryId || "",
    },
  });

  useEffect(() => {
    if (editMode?.data) {
      form.reset({
        name: editMode.data.name,
        priceSell: editMode.data.priceSell,
        profit: editMode.data.profit,
        stock: editMode.data.stock,
        categoryId: editMode.data.categoryId || "",
      });
    }
  }, [editMode, form]);

  const queryClient = useQueryClient();

  const { mutate: actionAddProduct } = useActionAddProduct();
  const { mutate: actionEditProduct } = useActionUpdateProduct({
    productId: editMode?.productId || "",
  });

  const { control, handleSubmit } = form;

  const actionForm = mode === "add" ? actionAddProduct : actionEditProduct;

  function onSubmit(values: validationAddProduct) {
    actionForm(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get10ProductsNotAvailable"],
        });
        queryClient.invalidateQueries({
          queryKey: ["get10ProductsAvailable"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getAllProduct"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getAllProductAvailable"],
        });
        setIsOpen(false);
        toast.success(
          mode === "add"
            ? "Produk berhasil ditambahkan"
            : "Produk berhasil diperbarui",
        );
        form.reset();
      },
      onError: () => {
        toast.error(
          mode === "add"
            ? "Produk gagal ditambahkan"
            : "Produk gagal diperbarui",
        );
      },
    });
  }

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
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={control}
                name="name"
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
                name="profit"
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
                  name="categoryId"
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

            <Button className="w-full mt-4 bg-primary" type="submit">
              Simpan
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
