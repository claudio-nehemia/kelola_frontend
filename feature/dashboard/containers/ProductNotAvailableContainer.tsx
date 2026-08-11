"use client";

import { OptionCategory } from "@/feature/_global/components/OptionCategory";
import { useState } from "react";
import { dataDummySample } from "../utils/dataDummySample";
import { CardProduct } from "@/feature/_global/components/CardProduct";

export function ProductNotAvailableContainer() {
  const [value, setValue] = useState("all");
  return (
    <>
      <div className="flex gap-4 justify-center items-center font-bold">
        <h1 className="underline underline-offset-3 text-xl">
          Product Tidak Tersedia
        </h1>
        <OptionCategory value={value} setValue={setValue} namingText="" />
      </div>

      <div className="grid grid-cols-5 gap-4 mt-5">
        {dataDummySample.map((p) => (
          <CardProduct
            key={p.id}
            productName={p.name}
            cleanProfit={p.cleanProfit}
            priceSell={p.price}
            category={p.category}
            stock={p.stock}
          />
        ))}
      </div>
    </>
  );
}
