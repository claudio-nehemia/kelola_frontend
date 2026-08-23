import { CardProduct } from "@/feature/_global/components/CardProduct";
import { dataBestSeller } from "../utils/dataDummy";

export function ProductBestSeller() {
  return (
    <div className="space-y-2 mt-10">
      <h1 className="bg-[#041336] w-fit text-white px-4 rounded-sm font-bold text-lg">
        10 Produk Terlaris (30 hari terakhir)
      </h1>

      <div className="grid grid-cols-5 gap-4">
        {dataBestSeller.map((product) => (
          <CardProduct
            productId={product.id}
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
