"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddProduct } from "@/feature/dashboard/components/content-action-product/AddProduct";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CardProduct({
  productName,
  priceSell,
  cleanProfit,
  stock,
  category,
}: {
  productName: string;
  priceSell: number;
  cleanProfit: number;
  stock: number;
  category: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card
        className="w-fit hover:cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/placeholder.png"
          alt={productName || "Product Image"}
          width={350}
          height={200}
          unoptimized
        />
        <CardContent>
          <h3 className="font-bold">{productName}</h3>
          <p className="text-lg">{formatRupiah(priceSell)}</p>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="gap-0.5">
          <DialogTitle className="font-bold">{productName}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Informasi Produk
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

            <div className="flex justify-end">
              <AddProduct mode="edit" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
