"use client";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/feature/_global/components/DatePickerWithRange";
import { OptionCategory } from "@/feature/_global/components/OptionCategory";
import { TableDataTransaction } from "@/feature/_global/components/TableDataTransaction";
import { Download } from "lucide-react";
import { useState } from "react";

export function DetailTransactionContainer() {
  const invoices = [
    {
      transactionId: "INV001",
      pelanggan: "Paid",
      tanggal: "2023-01-01",
      priceSell: 100000,
      profitSell: 20000,
      productDetail: ["Product A", "Product B", "Product C"],
    },
    {
      transactionId: "INV002",
      pelanggan: "Pending",
      tanggal: "2023-01-02",
      priceSell: 15000,
      profitSell: 3000,
      productDetail: ["Product D", "Product E"],
    },
    {
      transactionId: "INV003",
      pelanggan: "Unpaid",
      tanggal: "2023-01-03",
      total: "$350.00",
      priceSell: 50000,
      profitSell: 7000,
      productDetail: ["Product F", "Product G"],
    },
    {
      transactionId: "INV004",
      pelanggan: "Paid",
      tanggal: "2023-01-04",
      total: "$450.00",
      priceSell: 80000,
      profitSell: 15000,
      productDetail: ["Product H", "Product I"],
    },
    {
      transactionId: "INV005",
      pelanggan: "Paid",
      tanggal: "2023-01-05",
      total: "$550.00",
      priceSell: 120000,
      profitSell: 25000,
      productDetail: ["Product J", "Product K"],
    },
    {
      transactionId: "INV006",
      pelanggan: "Pending",
      tanggal: "2023-01-06",
      total: "$200.00",
      priceSell: 40000,
      profitSell: 5000,
      productDetail: ["Product L", "Product M"],
    },
    {
      transactionId: "INV007",
      pelanggan: "Pending",
      tanggal: "2023-01-07",
      total: "$200.00",
      priceSell: 40000,
      profitSell: 5000,
      productDetail: ["Product N", "Product O"],
    },
    {
      transactionId: "INV008",
      pelanggan: "Pending",
      tanggal: "2023-01-08",
      total: "$200.00",
      priceSell: 40000,
      profitSell: 5000,
      productDetail: ["Product P", "Product Q"],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl items-center gap-4">
        <h1 className="text-3xl font-bold">Detail Transaksi</h1>

        <div className="flex flex-wrap gap-2.5 items-center">
          <OptionCategory
            value={selectedCategory}
            setValue={setSelectedCategory}
            namingText=""
          />
          <DatePickerWithRange className="h-10.5" />

          <Button className="flex bg-green-500 hover:bg-green-400 text-white gap-4 h-10.5">
            <p>Unduh Excel</p>
            <Download />
          </Button>
        </div>
      </div>
      <TableDataTransaction dataTransaction={invoices} />
    </div>
  );
}
