"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputText } from "@/feature/_global/components/InputText";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useActionCategoryProduct } from "../../action/useActionCategoryProduct";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const AddCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori tidak boleh kosong"),
});

export function AddCategory({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const [errors, setErrors] = useState<{
    categoryName?: string;
  }>({});

  const { mutate: actionAddCategory } = useActionCategoryProduct();
  const queryClient = useQueryClient();

  function handleSubmit() {
    const result = AddCategorySchema.safeParse({
      name: categoryName,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        categoryName: fieldErrors.name?.[0],
      });
      return;
    }

    if (result.success) {
      setErrors({});
      actionAddCategory(
        { name: result.data.name },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCategoryProduct"] });
            toast.success("Kategori berhasil ditambahkan");
            setCategoryName("");
            setIsOpen(false);
          },
          onError: () => {
            toast.error("Kategori gagal ditambahkan / sudah tersedia");
          },
        },
      );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button className={`px-7 py-5 ${className || ""}`} />}>
        <BadgePlus />
        <p>Tambah Kategori</p>
      </DialogTrigger>

      <DialogContent className="gap-0.5">
        <DialogTitle className="font-bold">Tambah Kategori</DialogTitle>
        <DialogDescription>
          Tambahkan kategori baru untuk produk Anda.
        </DialogDescription>
        <InputText
          value={categoryName}
          setValue={setCategoryName}
          namingText="Tambah Kategori"
          className="mt-4"
        />
        {errors.categoryName && (
          <p className="text-red-500 ml-1 text-sm">{errors.categoryName}</p>
        )}

        <Button className="bg-primary mt-4" onClick={handleSubmit}>
          Simpan
        </Button>
      </DialogContent>
    </Dialog>
  );
}
