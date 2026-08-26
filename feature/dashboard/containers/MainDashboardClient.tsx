"use client";

import { useState } from "react";
import { SearchProduct } from "../../_global/components/SearchProduct";
import { actionButtonClient } from "../utils/actionButtonClient";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllProduct } from "../action/useGetAllProduct";
import Image from "next/image";
import { useDebounce } from "@/feature/_global/utils/useDebounce";
import { formatRupiah } from "../helpers/formatRupuah";

export default function MainDashboardClient() {
  const actionButton = actionButtonClient;
  const [searchValue, setSearchValue] = useState("");
  const [active, setActive] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const { data: dataSearch } = useGetAllProduct({
    search: debouncedSearchValue,
  });

  const dataDashboard = dataSearch || [];
  return (
    <>
      <div
        className={cn(`flex justify-between 
                          lg:flex-col lg:gap-3
                          xl:flex-row xl:gap-4
                                                    `)}
      >
        <div className="flex w-full flex-col gap-2 relative">
          <SearchProduct
            value={searchValue}
            setValue={setSearchValue}
            active={active}
            setActive={setActive}
            className="xl:w-212"
          />
          {active && dataDashboard.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-amber-50 rounded-sm p-2 z-50 shadow-lg mt-1">
              {dataDashboard.map((product) => (
                <Card
                  key={product.id}
                  className="gap-0 p-0 rounded-sm mb-2 last:mb-0 hover:cursor-pointer"
                >
                  <CardContent className="flex gap-2 p-0 items-center">
                    <Image
                      src="/placeholder.png"
                      alt={`Gambar ${product.name}`}
                      key={product.id}
                      width={100}
                      height={70}
                      unoptimized
                    />
                    <div>
                      <h1 className="font-bold text-[16px]">{product.name}</h1>
                      <h1>{formatRupiah(product.priceSell)}</h1>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap lg:gap-2 xl:gap-2">
          {actionButton.map((button, index) => (
            <div key={index}>{button.component}</div>
          ))}
        </div>
      </div>
    </>
  );
}
