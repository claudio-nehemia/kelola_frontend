"use client";

import { CardProduct } from "@/feature/_global/components/CardProduct";
import { NotebookTabs } from "lucide-react";
import Link from "next/link";
import { useGet10ProductsNotAvailable } from "../action/useGet10ProductsNotAvailable";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProductNotAvailable() {
  const { data: productsNotAvailable = [], isLoading } =
    useGet10ProductsNotAvailable();

  return (
    <div className="space-y-3 mt-8">
      <div className="flex items-center gap-2">
        <h1 className="flex bg-[#041336] w-fit text-white px-4 py-1 rounded-sm font-bold text-sm md:text-base">
          Produk Tidak Tersedia
        </h1>

        <Link href="/manage-product?status=tidak_tersedia">
          <div className="flex text-blue-500 items-center hover:underline cursor-pointer">
            <NotebookTabs size={16} />
            <p className="ml-1 text-sm font-medium">Lihat Detail</p>
          </div>
        </Link>
      </div>

      {productsNotAvailable.length === 0 && !isLoading && (
        <div className="border rounded-md flex flex-col justify-center items-center py-6 bg-white">
          <p className="text-muted-foreground text-center">
            Semua produk memiliki stok tersedia.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {productsNotAvailable.map((product: any) => (
          <CardProduct
            key={product.id}
            productId={product.id}
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
