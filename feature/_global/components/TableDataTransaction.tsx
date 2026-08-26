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
import { DetailTransaction } from "@/feature/dashboard/components/DetailTransaction";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { useTransactions } from "@/hooks/useTransactions";

export interface TransactionDataRow {
  transactionId: string;
  pelanggan: string;
  tanggal: string;
  productDetail?: string[];
  priceSell: number;
  profitSell: number;
}

export function TableDataTransaction({
  dataTransaction,
}: {
  dataTransaction?: TransactionDataRow[];
}) {
  const { data: dbTransactions = [], isLoading } = useTransactions();

  const transactions: TransactionDataRow[] =
    dataTransaction ||
    dbTransactions.map((tx: any) => {
      const productDetail = (tx.items || []).map(
        (item: any) =>
          `${item.product?.name || "Produk"} (${item.quantity}x @ ${formatRupiah(item.price || 0)})`,
      );
      const totalCost = (tx.items || []).reduce(
        (sum: number, item: any) => sum + (item.costPrice || 0) * (item.quantity || 1),
        0,
      );
      const profitSell = Math.max(0, (tx.totalAmount || 0) - totalCost);

      return {
        transactionId: tx.invoice || tx.id,
        pelanggan: tx.customerName || "Umum",
        tanggal: tx.createdAt
          ? new Date(tx.createdAt).toLocaleDateString("id-ID")
          : "-",
        productDetail,
        priceSell: tx.totalAmount || 0,
        profitSell,
      };
    });

  const totalPenjualan = transactions.reduce(
    (acc, curr) => acc + curr.priceSell,
    0,
  );

  const totalProfit = transactions.reduce(
    (acc, curr) => acc + curr.profitSell,
    0,
  );

  return (
    <div className="flex flex-col w-full max-w-6xl px-4 md:px-7 py-3 justify-center border-2 rounded-lg bg-white overflow-x-auto">
      {isLoading && !dataTransaction ? (
        <p className="text-center py-6 text-gray-500">Memuat data transaksi...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center py-6 text-gray-500">Tidak ada transaksi ditemukan.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">No. Invoice</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Total Transaksi</TableHead>
              <TableHead>Keuntungan Bersih</TableHead>
              <TableHead className="text-right">Detail</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((d) => (
              <TableRow key={d.transactionId}>
                <TableCell className="font-medium text-blue-600">
                  {d.transactionId}
                </TableCell>
                <TableCell>{d.pelanggan}</TableCell>
                <TableCell>{d.tanggal}</TableCell>
                <TableCell className="font-semibold">
                  {formatRupiah(d.priceSell)}
                </TableCell>
                <TableCell className="text-green-600 font-semibold">
                  {formatRupiah(d.profitSell)}
                </TableCell>
                <TableCell className="text-right">
                  <DetailTransaction
                    namaPelanggan={d.pelanggan}
                    detailTransaksi={d.productDetail || []}
                    totalTransaksi={d.priceSell}
                    totalKeuntungan={d.profitSell}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">Total Penjualan</TableCell>
              <TableCell colSpan={3} className="text-right font-bold text-blue-700">
                {formatRupiah(totalPenjualan)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">Total Keuntungan Bersih</TableCell>
              <TableCell colSpan={3} className="text-right font-bold text-green-700">
                {formatRupiah(totalProfit)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
