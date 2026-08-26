"use client";

import { OptionCategory } from "@/feature/_global/components/OptionCategory";
import { useEffect, useState } from "react";
import { CardProduct } from "@/feature/_global/components/CardProduct";
import { useGetAllProductAvailable } from "../action/useGetAllProductAvailable";
import { StatusManageProduct } from "@/feature/_global/components/StatusManageProduct";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function ManageProductContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedStatus, setSelectedStatus] = useState(
    () => searchParams.get("status") || "all",
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedStatus !== "all") params.set("status", selectedStatus);
    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`);
  }, [selectedStatus, pathname, router]);

  const { data: dataProduct = [] } = useGetAllProductAvailable({
    status: selectedStatus === "all" ? undefined : selectedStatus,
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  return (
    <>
      <div className="flex gap-4 justify-center items-center font-bold text-2xl">
        <div className="flex gap-2 items-center">
          <h1
            className={cn(
              `${selectedStatus === "tersedia" && "text-green-500"}
              ${selectedStatus === "tidak_tersedia" && "text-red-500"}
              ${selectedStatus === "all" && "text-gray-500"}
              `,
            )}
          >
            Kelola Produk
          </h1>
          <StatusManageProduct
            value={selectedStatus}
            setValue={setSelectedStatus}
          />
        </div>
        <OptionCategory
          value={selectedCategory}
          setValue={setSelectedCategory}
          namingText="Kategori"
          className="w-50 border-2"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        {dataProduct.map((p: any) => (
          <CardProduct
            key={p.id}
            productId={p.id}
            productName={p.name}
            cleanProfit={p.profit}
            priceSell={p.priceSell}
            category={p.category}
            stock={p.stock}
          />
        ))}
      </div>
    </>
  );
}
