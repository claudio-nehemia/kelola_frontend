import { Suspense } from "react";
import { ManageProductContainer } from "../containers/ManageProductContainer";

export function ManageProductView() {
  return (
    <Suspense fallback={<p className="text-center py-8 text-gray-500">Memuat halaman produk...</p>}>
      <ManageProductContainer />
    </Suspense>
  );
}
