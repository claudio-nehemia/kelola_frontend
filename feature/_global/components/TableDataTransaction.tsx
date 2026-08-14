"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useTransactions } from "@/hooks/useTransactions";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";

export function TableDataTransaction() {
  const { data: transactions = [], isLoading } = useTransactions();

  const recentTransactions = transactions.slice(0, 6);
  const totalSum = transactions.reduce((sum, tx) => sum + (tx.totalAmount || 0), 0);

  return (
    <div className="border-2 w-full rounded-md px-4 py-2">
      <div className="p-2 flex justify-between items-center">
        <h1 className="text-lg font-bold mb-1">Tabel Transaksi</h1>
        <Link href="/detail-transaction">
          <span className="text-blue-500 underline hover:cursor-pointer text-sm underline-offset-4 hover:text-blue-700 font-medium">
            selengkapnya
          </span>
        </Link>
      </div>

      {isLoading ? (
        <p className="text-gray-500 py-6 text-center text-sm">Memuat data transaksi...</p>
      ) : recentTransactions.length === 0 ? (
        <p className="text-gray-500 py-6 text-center text-sm">Belum ada data transaksi.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.invoice}</TableCell>
                <TableCell>{tx.customerName}</TableCell>
                <TableCell>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${tx.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {tx.status}
                  </span>
                </TableCell>
                <TableCell>{tx.paymentMethod}</TableCell>
                <TableCell className="text-right font-semibold">
                  {formatRupiah(tx.totalAmount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-bold">Total Transaksi ({transactions.length})</TableCell>
              <TableCell className="text-right font-bold">{formatRupiah(totalSum)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
