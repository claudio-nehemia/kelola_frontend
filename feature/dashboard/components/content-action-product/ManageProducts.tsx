"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PackageSearch, Trash2 } from "lucide-react";
import { useState } from "react";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { AddProduct } from "./AddProduct";
import { InputText } from "@/feature/_global/components/InputText";

export function ManageProducts({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: products = [], isLoading } = useProducts();
  const deleteProductMutation = useDeleteProduct();

  const filteredProducts = products.filter((p) =>
    (p.name || p.productName || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  async function handleDelete(id: string, name: string) {
    if (confirm(`Apakah Anda yakin ingin menghapus produk '${name}'?`)) {
      try {
        await deleteProductMutation.mutateAsync(id);
      } catch (err: any) {
        alert(err?.response?.data?.message || "Gagal menghapus produk");
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={<Button className={`px-7 py-5 ${className || ""}`} />}
      >
        <PackageSearch />
        <p>Kelola Produk</p>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogTitle className="text-xl font-bold">Kelola Produk</DialogTitle>

        <div className="my-2">
          <InputText
            value={searchQuery}
            setValue={setSearchQuery}
            namingText="Cari Produk"
          />
        </div>

        <div className="overflow-y-auto flex-1 border rounded-md p-2 mt-2">
          {isLoading ? (
            <p className="p-4 text-center text-gray-500">Memuat produk...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="p-4 text-center text-gray-500">
              Tidak ada produk ditemukan.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-2">Nama Produk</th>
                  <th className="p-2">Kategori</th>
                  <th className="p-2">Harga Jual</th>
                  <th className="p-2">Keuntungan</th>
                  <th className="p-2">Stok</th>
                  <th className="p-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-2 font-semibold">
                      {p.name || p.productName}
                    </td>
                    <td className="p-2">
                      {p.category?.name || p.categoryName || "-"}
                    </td>
                    <td className="p-2">
                      {formatRupiah(p.sellPrice || p.priceSell || 0)}
                    </td>
                    <td className="p-2 text-green-600">
                      {formatRupiah(p.cleanProfit || 0)}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          p.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <AddProduct
                          mode="edit"
                          initialData={p}
                          className="h-8 px-2 text-xs"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={() =>
                            handleDelete(p.id, p.name || p.productName || "")
                          }
                          disabled={deleteProductMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
