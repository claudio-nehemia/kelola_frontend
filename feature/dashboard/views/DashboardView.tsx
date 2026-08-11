import MainDashboardClient from "../containers/MainDashboardClient";
import OverviewTransaction from "../containers/OverviewTransaction";
import { ProductAvailable } from "../containers/ProductAvailable";
import { ProductBestSeller } from "../containers/ProductBestSeller";
import { ProductNotAvailable } from "../containers/ProductNotAvailable";

export default function DashboardView() {
  return (
    <div className="flex flex-col space-y-5">
      <MainDashboardClient />
      <OverviewTransaction />
      <ProductBestSeller />
      <ProductAvailable />
      <ProductNotAvailable />
    </div>
  );
}
