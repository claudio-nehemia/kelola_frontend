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
  const { data: productsAvailable, isLoading } = useGet10ProductsAvailable();

  return (
    <div className="space-y-2 mt-10">
      <div className="flex items-center gap-2">
        <h1 className="flex bg-[#041336] w-fit text-white px-4 rounded-sm font-bold">
          Produk Tersedia
        </h1>
        <Link href="/manage-product?status=tersedia">
          <div className="flex text-blue-500 items-center">
            <NotebookTabs size={16} />
            <p>Lihat Detail</p>
          </div>
        </Link>
      </div>

      {productsAvailable?.length === 0 && !isLoading && (
        <div className="border-4 w-fit rounded-md flex flex-col justify-center items-center py-2.5 px-3.5">
          <p className="text-muted-foreground text-center px-6">
            Tidak ada produk tersedia. <br /> Tambah atau Kelola Produk.
          </p>
          <AddProduct mode="add" className="mt-1.5 w-65 text-md" />
          <Link href="/manage-product">
            <Button className="px-7 py-5 w-65 bg-amber-300 hover:bg-amber-200 hover:cursor-pointer text-black font-bold text-md">
              <PackageSearch />
              <p>Kelola Produk</p>
            </Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {productsAvailable?.map((product) => (
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
                className={cn("w-full h-52 animate-pulse bg-muted-foreground/20")}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
