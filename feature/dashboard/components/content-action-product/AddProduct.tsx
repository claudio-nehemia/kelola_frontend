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
import { useActionUpdateProduct } from "../../action/useActionUpdateProduct";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ProductItem } from "@/hooks/useProducts";

export function AddProduct({
  mode,
  initialData,
  className,
  editMode,
}: {
  mode: "add" | "edit";
  initialData?: ProductItem;
  className?: string;
  editMode?: {
    productId: string;
    data: validationAddProduct;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const productId = editMode?.productId || initialData?.id || "";

  const form = useForm<validationAddProduct>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      name:
        editMode?.data?.name ||
        initialData?.name ||
        initialData?.productName ||
        "",
      priceSell:
        editMode?.data?.priceSell ||
        initialData?.sellPrice ||
        initialData?.priceSell ||
        0,
      profit:
        editMode?.data?.profit ||
        initialData?.cleanProfit ||
        (initialData?.sellPrice && initialData?.costPrice
          ? initialData.sellPrice - initialData.costPrice
          : 0),
      stock: editMode?.data?.stock || initialData?.stock || 0,
      categoryId:
        editMode?.data?.categoryId ||
        initialData?.categoryId ||
        initialData?.category?.id ||
        "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: actionAddProduct, isPending: isAdding } =
    useActionAddProduct();
  const { mutate: actionEditProduct, isPending: isEditing } =
    useActionUpdateProduct({
      productId,
    });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (editMode?.data) {
      reset(editMode.data);
    } else if (initialData) {
      reset({
        name: initialData.name || initialData.productName || "",
        priceSell: initialData.sellPrice || initialData.priceSell || 0,
        profit:
          initialData.cleanProfit ||
          (initialData.sellPrice && initialData.costPrice
            ? initialData.sellPrice - initialData.costPrice
            : 0),
        stock: initialData.stock || 0,
        categoryId:
          initialData.categoryId || initialData.category?.id || "",
      });
    }
  }, [initialData, editMode, reset]);

  const isPending = isAdding || isEditing;

  function onSubmit(values: validationAddProduct) {
    setErrorMessage("");

    if (mode === "add") {
      actionAddProduct(values, {
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
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
          setIsOpen(false);
          toast.success("Produk berhasil ditambahkan!");
          reset();
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Produk gagal ditambahkan";
          setErrorMessage(msg);
          toast.error(msg);
        },
      });
    } else {
      actionEditProduct(values, {
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
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
          setIsOpen(false);
          toast.success("Produk berhasil diperbarui!");
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Produk gagal diperbarui";
          setErrorMessage(msg);
          toast.error(msg);
        },
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {mode === "add" && (
        <DialogTrigger
          render={<Button className={`px-7 py-5 ${className || ""}`} />}
        >
          <FunnelPlus />
          <p>Tambah Produk</p>
        </DialogTrigger>
      )}

      {mode === "edit" && (
        <DialogTrigger
          render={<Button className={`px-4 py-2 ${className || ""}`} />}
        >
          <SquarePen />
          <p>Edit Produk</p>
        </DialogTrigger>
      )}

      <DialogContent className="gap-0.5">
        <DialogTitle className="font-bold">
          {mode === "add" ? "Tambah Produk" : "Edit Produk"}
        </DialogTitle>
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
                      setValue={(val) => field.onChange(Number(val))}
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
                      setValue={(val) => field.onChange(Number(val))}
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
                    <FormItem className="flex-1">
                      <OptionCategory
                        className="w-full"
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
                    <FormItem className="flex-1">
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
