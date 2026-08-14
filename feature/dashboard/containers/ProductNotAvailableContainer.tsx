"use client";

import { OptionCategory } from "@/feature/_global/components/OptionCategory";
import { useState } from "react";
import { CardProduct } from "@/feature/_global/components/CardProduct";
import { useProducts } from "@/hooks/useProducts";

export function ProductNotAvailableContainer() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: products = [], isLoading } = useProducts();

  const outOfStockProducts = products
    .filter((p) => p.stock <= 0)
    .filter((p) => selectedCategory === "all" || p.categoryId === selectedCategory);

  return (
    <>
      <div className="flex gap-4 justify-center items-center font-bold">
        <h1 className="underline underline-offset-3 text-xl">
          Product Tidak Tersedia
        </h1>
        <OptionCategory value={selectedCategory} setValue={setSelectedCategory} namingText="" includeAll={true} />
      </div>

      {isLoading ? (
        <p className="text-gray-500 text-center py-10">Memuat produk...</p>
      ) : outOfStockProducts.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Tidak ada produk yang habis stok untuk kategori ini.</p>
      ) : (
        <div className="grid grid-cols-5 gap-4 mt-5">
          {outOfStockProducts.map((p) => (
            <CardProduct
              key={p.id}
              productName={p.name || p.productName || ""}
              cleanProfit={p.cleanProfit || (p.sellPrice - p.costPrice) || 0}
              priceSell={p.sellPrice || p.priceSell || 0}
              category={p.category?.name || p.categoryName || "-"}
              stock={p.stock}
              product={p}
            />
          ))}
        </div>
      )}
    </>
  );
}
