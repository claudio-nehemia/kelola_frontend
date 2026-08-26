"use client";

import { useState } from "react";
import { SearchProduct } from "../../_global/components/SearchProduct";
import { actionButtonClient } from "../utils/actionButtonClient";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllProduct } from "../action/useGetAllProduct";
import Image from "next/image";
import { useDebounce } from "@/feature/_global/utils/useDebounce";
import { formatRupiah } from "../helpers/formatRupuah";

export default function MainDashboardClient() {
  const actionButton = actionButtonClient;
  const [searchValue, setSearchValue] = useState("");
  const [active, setActive] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  const { data: dataSearch } = useGetAllProduct({
    search: debouncedSearchValue,
  });

  const dataDashboard = dataSearch || [];

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-4 w-full items-start">
      <div className="flex w-full flex-col gap-2 relative flex-1">
        <SearchProduct
          value={searchValue}
          setValue={setSearchValue}
          active={active}
          setActive={setActive}
          className="w-full"
        />
        {active && searchValue && (
          <div className="absolute top-full left-0 w-full bg-white border rounded-md p-2 z-50 shadow-lg mt-1 max-h-64 overflow-y-auto">
            {dataDashboard.length === 0 ? (
              <p className="p-3 text-sm text-gray-500 text-center">
                Produk tidak ditemukan
              </p>
            ) : (
              dataDashboard.map((product: any) => (
                <Card
                  key={product.id}
                  className="gap-0 p-0 rounded-sm mb-2 last:mb-0 hover:bg-blue-50 cursor-pointer border"
                >
                  <CardContent className="flex gap-3 p-2 items-center">
                    <Image
                      src="/placeholder.png"
                      alt={`Gambar ${product.name}`}
                      width={60}
                      height={45}
                      className="object-cover rounded"
                      unoptimized
                    />
                    <div>
                      <h1 className="font-bold text-sm">{product.name}</h1>
                      <p className="text-xs text-blue-600 font-semibold">
                        {formatRupiah(product.priceSell || product.sellPrice || 0)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Stok: {product.stock} | Kategori: {product.category || "-"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-start lg:justify-end">
        {actionButton.map((button, index) => (
          <div key={index}>{button.component}</div>
        ))}
      </div>
    </div>
  );
}
