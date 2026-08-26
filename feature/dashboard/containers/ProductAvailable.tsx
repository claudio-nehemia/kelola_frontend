"use client";

import { CardProduct } from "@/feature/_global/components/CardProduct";
import { NotebookTabs, PackageSearch } from "lucide-react";
import Link from "next/link";
import { useGet10ProductsAvailable } from "../action/useGet10ProductsAvailable";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AddProduct } from "../components/content-action-product/AddProduct";
import { Button } from "@/components/ui/button";

export function ProductAvailable() {
  const { data: productsAvailable = [], isLoading } =
    useGet10ProductsAvailable();

  return (
    <div className="space-y-3 mt-8">
      <div className="flex items-center gap-2">
        <h1 className="flex bg-[#041336] w-fit text-white px-4 py-1 rounded-sm font-bold text-sm md:text-base">
          Produk Tersedia
        </h1>
        <Link href="/manage-product?status=tersedia">
          <div className="flex text-blue-500 items-center hover:underline cursor-pointer">
            <NotebookTabs size={16} />
            <p className="ml-1 text-sm font-medium">Lihat Detail</p>
          </div>
        </Link>
      </div>

      {productsAvailable.length === 0 && !isLoading && (
        <div className="border-2 rounded-md flex flex-col justify-center items-center py-6 px-4 bg-white">
          <p className="text-muted-foreground text-center mb-3">
            Tidak ada produk tersedia. Silahkan tambah produk.
          </p>
          <div className="flex gap-2">
            <AddProduct mode="add" className="text-sm" />
            <Link href="/manage-product">
              <Button className="px-5 py-5 bg-amber-300 hover:bg-amber-200 text-black font-bold text-sm">
                <PackageSearch className="w-4 h-4 mr-1" />
                Kelola Produk
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {productsAvailable.map((product: any) => (
          <CardProduct
            productId={product.id}
            key={product.id}
            productName={product.name}
            priceSell={product.priceSell}
            cleanProfit={product.profit}
            stock={product.stock}
            category={product.category}
          />
        ))}

        {isLoading && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className={cn(
                  "w-full h-52 animate-pulse bg-muted-foreground/20",
                )}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
