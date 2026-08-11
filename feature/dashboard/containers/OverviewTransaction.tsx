import { ChartLineLinear } from "@/feature/_global/components/ChartLineLinear";
import { TableDataTransaction } from "@/feature/_global/components/TableDataTransaction";

export default function OverviewTransaction() {
  return (
    <div className="flex space-x-15 w-full">
      <ChartLineLinear />
      <TableDataTransaction />
    </div>
  );
}
