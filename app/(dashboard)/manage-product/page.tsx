"use client";

import { useState } from "react";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { InputText } from "@/feature/_global/components/InputText";
import { AddProduct } from "@/feature/dashboard/components/content-action-product/AddProduct";
import { AddCategory } from "@/feature/dashboard/components/content-action-product/AddCategory";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ManageProductPage() {
  const [search, setSearch] = useState("");
  const { data: products = [], isLoading } = useProducts();
  const deleteProductMutation = useDeleteProduct();

  const filteredProducts = products.filter((p) =>
    (p.name || p.productName || "").toLowerCase().includes(search.toLowerCase())
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
    <div className="space-y-6 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="p-2 border rounded-md hover:bg-gray-100 flex items-center gap-1 text-sm font-semibold">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" /> Kelola Produk
          </h1>
        </div>

        <div className="flex gap-2">
          <AddCategory />
          <AddProduct mode="add" />
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 border rounded-md shadow-sm">
        <div className="w-80">
          <InputText
            value={search}
            setValue={setSearch}
            namingText="Cari Produk..."
          />
        </div>
        <span className="text-sm text-gray-500 font-medium">
          Total {filteredProducts.length} produk
        </span>
      </div>

      <div className="border rounded-md bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <p className="p-8 text-center text-gray-500">Memuat data produk...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="p-8 text-center text-gray-500">Tidak ada produk ditemukan.</p>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga Jual</TableHead>
                <TableHead>Keuntungan Bersih</TableHead>
                <TableHead>Stok Persediaan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((p) => (
                <TableRow key={p.id} className="hover:bg-gray-50">
                  <TableCell className="font-bold">{p.name || p.productName}</TableCell>
                  <TableCell>{p.category?.name || p.categoryName || "-"}</TableCell>
                  <TableCell className="font-semibold text-blue-600">
                    {formatRupiah(p.sellPrice || p.priceSell || 0)}
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    {formatRupiah(p.cleanProfit || 0)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        p.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 items-center">
                      <AddProduct mode="edit" initialData={p} className="h-8 px-3 text-xs" />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => handleDelete(p.id, p.name || p.productName || "")}
                        disabled={deleteProductMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
