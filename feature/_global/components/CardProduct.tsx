"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddProduct } from "@/feature/dashboard/components/content-action-product/AddProduct";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { ProductItem } from "@/hooks/useProducts";
import Image from "next/image";
import { useState } from "react";

export function CardProduct({
  productName,
  priceSell,
  cleanProfit,
  stock,
  category,
  product,
}: {
  productName: string;
  priceSell: number;
  cleanProfit: number;
  stock: number;
  category: string;
  product?: ProductItem;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card
        className="w-full hover:cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-full h-36 bg-gray-100 flex items-center justify-center overflow-hidden relative">
          <Image
            src="/placeholder.png"
            alt={productName || "Product Image"}
            width={200}
            height={150}
            className="object-cover"
            unoptimized
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-bold text-base truncate">{productName}</h3>
          <p className="text-sm font-semibold text-blue-600 mt-1">{formatRupiah(priceSell)}</p>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
            <span>Stok: {stock}</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded truncate max-w-[100px]">{category}</span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="gap-0.5">
          <DialogTitle className="font-bold">{productName}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Informasi Detail Produk
          </DialogDescription>

          <div className="mt-4 space-y-2 w-full">
            <p>
              <span className="font-bold">Harga Jual:</span>{" "}
              {formatRupiah(priceSell)}
            </p>
            <p>
              <span className="font-bold">Keuntungan Bersih:</span>{" "}
              {formatRupiah(cleanProfit)}
            </p>
            <p>
              <span className="font-bold">Stok Persediaan:</span> {stock}
            </p>
            <p>
              <span className="font-bold">Kategori:</span> {category}
            </p>

            <div className="flex justify-end pt-4">
              <AddProduct mode="edit" initialData={product} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
