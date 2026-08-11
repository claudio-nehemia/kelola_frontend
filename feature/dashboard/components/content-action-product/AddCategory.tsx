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

const AddCategorySchema = z.object({
  categoryName: z.string().min(1, "Nama kategori tidak boleh kosong"),
});

export function AddCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  
  const [errors, setErrors] = useState<{
    categoryName?: string;
  }>({});

  function handleSubmit() {
    const result = AddCategorySchema.safeParse({
      categoryName: categoryName,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        categoryName: fieldErrors.categoryName?.[0],
      });
      return;
    }
    setErrors({});
    console.log("Submitted category name:", result.data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button className=" px-7 py-5" />}>
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
          <p className="text-red-500">{errors.categoryName}</p>
        )}

        <Button className="bg-primary mt-4" onClick={handleSubmit}>
          Simpan
        </Button>
      </DialogContent>
    </Dialog>
  );
}
