import { CardProduct } from "@/feature/_global/components/CardProduct";
import { dataBestSeller } from "../utils/dataDummy";
import { NotebookTabs } from "lucide-react";
import Link from "next/link";

export function ProductNotAvailable() {
  return (
    <div className="space-y-2 mt-10">
      <div className="flex items-center gap-2">
        <h1 className="flex bg-[#041336] w-fit text-white px-4 rounded-sm font-bold">
          Produk Tidak Tersedia
        </h1>

        <Link href="/product-not-available">
          <div className="flex text-blue-500 items-center">
            <NotebookTabs size={16} />
            <p>Lihat Detail</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {dataBestSeller.map((product) => (
          <CardProduct
            key={product.id}
            productName={product.name}
            priceSell={product.price}
            cleanProfit={product.cleanProfit}
            stock={product.stock}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}
