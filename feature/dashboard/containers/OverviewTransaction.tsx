import { ChartLineLinear } from "@/feature/_global/components/ChartLineLinear";
import { HighlightTableDataTransaction } from "@/feature/_global/components/HighlightTableDataTransaction";

export default function OverviewTransaction() {
  const invoices = [
    {
      transactionId: "INV001",
      pelanggan: "Paid",
      tanggal: "2023-01-01",
      total: "Credit Card",
    },
    {
      transactionId: "INV002",
      pelanggan: "Pending",
      tanggal: "2023-01-02",
      total: "$150.00",
    },
    {
      transactionId: "INV003",
      pelanggan: "Unpaid",
      tanggal: "2023-01-03",
      total: "$350.00",
    },
    {
      transactionId: "INV004",
      pelanggan: "Paid",
      tanggal: "2023-01-04",
      total: "$450.00",
    },
    {
      transactionId: "INV005",
      pelanggan: "Paid",
      tanggal: "2023-01-05",
      total: "$550.00",
    },
    {
      transactionId: "INV006",
      pelanggan: "Pending",
      tanggal: "2023-01-06",
      total: "$200.00",
    },
    {
      transactionId: "INV007",
      pelanggan: "Pending",
      tanggal: "2023-01-07",
      total: "$200.00",
    },
    {
      transactionId: "INV008",
      pelanggan: "Pending",
      tanggal: "2023-01-08",
      total: "$200.00",
    },
  ];

  return (
    <div className="flex space-x-15 w-full">
      <ChartLineLinear />
      <HighlightTableDataTransaction dataTransaction={invoices} />
    </div>
  );
}
