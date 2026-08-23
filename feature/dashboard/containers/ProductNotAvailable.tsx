"use client";

import { CardProduct } from "@/feature/_global/components/CardProduct";
import { NotebookTabs } from "lucide-react";
import Link from "next/link";
import { useGet10ProductsNotAvailable } from "../action/useGet10ProductsNotAvailable";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProductNotAvailable() {
  const { data: productsNotAvailable, isLoading } =
    useGet10ProductsNotAvailable();

  return (
    <div className="space-y-2 mt-10">
      <div className="flex items-center gap-2">
        <h1 className="flex bg-[#041336] w-fit text-white px-4 rounded-sm font-bold">
          Produk Tidak Tersedia
        </h1>

        <Link href="/manage-product?status=tidak_tersedia">
          <div className="flex text-blue-500 items-center">
            <NotebookTabs size={16} />
            <p>Lihat Detail</p>
          </div>
        </Link>
      </div>

      {productsNotAvailable?.length === 0 && !isLoading && (
        <div className="border w-fit rounded-md flex flex-col justify-center items-center py-1.5">
          <p className="text-muted-foreground text-center px-6 py-8">
            semua produk memiliki stok tersedia.
          </p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-4">
        {productsNotAvailable?.map((product) => (
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
                className={cn(` lg:w-42 xl:w-85
                                lg:h-40 xl:h-60 
                                animate-pulse bg-muted-foreground`)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
