"use client";

import { CardProduct } from "@/feature/_global/components/CardProduct";
import { useBestSellers } from "@/hooks/useTransactions";

export function ProductBestSeller() {
  const { data: bestSellers = [], isLoading } = useBestSellers();

  return (
    <div className="space-y-3 mt-8">
      <h1 className="bg-[#041336] w-fit text-white px-4 py-1 rounded-sm font-bold text-sm md:text-base">
        10 Produk Terlaris
      </h1>

      {isLoading ? (
        <p className="text-gray-500 py-4 text-sm">Memuat produk terlaris...</p>
      ) : bestSellers.length === 0 ? (
        <p className="text-gray-500 py-4 text-sm">
          Belum ada data transaksi produk terlaris.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {bestSellers.map((product: any) => (
            <CardProduct
              key={product.id}
              productId={product.id}
              productName={product.name || product.productName || ""}
              priceSell={
                product.sellPrice || product.priceSell || product.price || 0
              }
              cleanProfit={product.cleanProfit || 0}
              stock={product.stock || 0}
              category={
                product.category?.name ||
                product.categoryName ||
                product.category ||
                "-"
              }
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
