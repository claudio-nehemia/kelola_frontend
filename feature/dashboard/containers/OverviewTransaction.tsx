import { ChartLineLinear } from "@/feature/_global/components/ChartLineLinear";
import { TableDataTransaction } from "@/feature/_global/components/TableDataTransaction";

export default function OverviewTransaction() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
      <ChartLineLinear />
      <TableDataTransaction />
    </div>
  );
}
