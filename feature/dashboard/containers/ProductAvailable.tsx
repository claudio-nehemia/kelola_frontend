"use client";

import { CardProduct } from "@/feature/_global/components/CardProduct";
import { NotebookTabs } from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";

export function ProductAvailable() {
  const { data: products = [], isLoading } = useProducts();

  const availableProducts = products.filter((p) => p.stock > 0).slice(0, 10);

  return (
    <div className="space-y-2 mt-10">
      <div className="flex items-center gap-2">
        <h1 className="flex bg-[#041336] w-fit text-white px-4 rounded-sm font-bold">
          Produk Tersedia
        </h1>
        <Link href="/product-available">
          <div className="flex text-blue-500 items-center hover:underline cursor-pointer">
            <NotebookTabs size={16} />
            <p className="ml-1 text-sm font-medium">Lihat Detail</p>
          </div>
        </Link>
      </div>

      {isLoading ? (
        <p className="text-gray-500 py-4">Memuat produk...</p>
      ) : availableProducts.length === 0 ? (
        <p className="text-gray-500 py-4">Tidak ada produk yang tersedia.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {availableProducts.map((product) => (
            <CardProduct
              key={product.id}
              productName={product.name || product.productName || ""}
              priceSell={product.sellPrice || product.priceSell || 0}
              cleanProfit={product.cleanProfit || (product.sellPrice - product.costPrice) || 0}
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
