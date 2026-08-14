"use client";

import { CardProduct } from "@/feature/_global/components/CardProduct";
import { useBestSellers } from "@/hooks/useTransactions";

export function ProductBestSeller() {
  const { data: bestSellers = [], isLoading } = useBestSellers();

  return (
    <div className="space-y-2 mt-10">
      <h1 className="bg-[#041336] w-fit text-white px-4 rounded-sm font-bold text-lg">
        10 Produk Terlaris (30 hari terakhir)
      </h1>

      {isLoading ? (
        <p className="text-gray-500 py-4">Memuat produk terlaris...</p>
      ) : bestSellers.length === 0 ? (
        <p className="text-gray-500 py-4">Belum ada data transaksi produk terlaris.</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {bestSellers.map((product: any) => (
            <CardProduct
              key={product.id}
              productName={product.name || product.productName || ""}
              priceSell={product.sellPrice || product.priceSell || 0}
              cleanProfit={product.cleanProfit || 0}
              stock={product.stock}
              category={product.category?.name || product.categoryName || "-"}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
