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
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { useTransactions } from "@/hooks/useTransactions";
import Link from "next/link";

export interface TransactionHighlight {
  transactionId: string;
  pelanggan: string;
  tanggal: string;
  total: string;
}

export function HighlightTableDataTransaction({
  dataTransaction,
}: {
  dataTransaction?: TransactionHighlight[];
}) {
  const { data: dbTransactions = [], isLoading } = useTransactions();

  const transactions: TransactionHighlight[] =
    dataTransaction ||
    dbTransactions.slice(0, 6).map((tx: any) => ({
      transactionId: tx.invoice || tx.id,
      pelanggan: tx.customerName || "Umum",
      tanggal: tx.createdAt
        ? new Date(tx.createdAt).toLocaleDateString("id-ID")
        : "-",
      total: formatRupiah(tx.totalAmount || 0),
    }));

  const totalSum = (dataTransaction ? dbTransactions : dbTransactions).reduce(
    (sum, tx) => sum + (tx.totalAmount || 0),
    0,
  );

  return (
    <div className="border-2 w-full rounded-md px-4 bg-white">
      <div className="p-2 flex justify-between items-center">
        <h1 className="text-lg font-bold mb-1">Tabel Transaksi</h1>
        <Link href="/detail-transaction">
          <p className="text-blue-500 underline hover:cursor-pointer text-sm underline-offset-4 hover:text-blue-700">
            selengkapnya
          </p>
        </Link>
      </div>
      {isLoading && !dataTransaction ? (
        <p className="p-4 text-center text-sm text-gray-500">Memuat data...</p>
      ) : transactions.length === 0 ? (
        <p className="p-4 text-center text-sm text-gray-500">Belum ada transaksi.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">No. Invoice</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((d) => (
              <TableRow key={d.transactionId}>
                <TableCell className="font-medium text-blue-600">{d.transactionId}</TableCell>
                <TableCell>{d.pelanggan}</TableCell>
                <TableCell>{d.tanggal}</TableCell>
                <TableCell className="text-right font-semibold">{d.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">Total Penjualan</TableCell>
              <TableCell className="text-right font-bold text-blue-700">
                {formatRupiah(totalSum)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
