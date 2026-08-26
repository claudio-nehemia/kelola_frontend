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

  const { mutate: actionAddCategory, isPending } = useActionCategoryProduct();
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

    setErrors({});
    actionAddCategory(
      { name: result.data.name },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getCategoryProduct"] });
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          toast.success("Kategori berhasil ditambahkan!");
          setCategoryName("");
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            "Kategori gagal ditambahkan / sudah tersedia";
          setErrors({ categoryName: msg });
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button className={`px-7 py-5 ${className || ""}`} />
        }
      >
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
          <p className="text-red-500 text-sm mt-1">{errors.categoryName}</p>
        )}

        <Button
          className="bg-primary mt-4"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
