"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { InputText } from "@/feature/_global/components/InputText";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Receipt, DollarSign, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function DetailTransactionRoute() {
  const [search, setSearch] = useState("");
  const { data: transactions = [], isLoading } = useTransactions();

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.invoice.toLowerCase().includes(search.toLowerCase()) ||
      tx.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = transactions.reduce((sum, tx) => sum + tx.totalAmount, 0);
  const totalItemsSold = transactions.reduce(
    (sum, tx) => sum + tx.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );

  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <button className="p-2 border rounded-md hover:bg-gray-100 flex items-center gap-1 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Detail Histori Transaksi</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Transaksi</CardTitle>
            <Receipt className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Pendapatan</CardTitle>
            <DollarSign className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatRupiah(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Item Terjual</CardTitle>
            <ShoppingBag className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItemsSold} Unit</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <div className="flex justify-between items-center bg-white p-4 border rounded-md shadow-sm">
        <div className="w-80">
          <InputText
            value={search}
            setValue={setSearch}
            namingText="Cari Invoice / Customer"
          />
        </div>
        <span className="text-sm text-gray-500 font-medium">
          Menampilkan {filteredTransactions.length} transaksi
        </span>
      </div>

      {/* Table */}
      <div className="border rounded-md bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <p className="p-8 text-center text-gray-500">Memuat histori transaksi...</p>
        ) : filteredTransactions.length === 0 ? (
          <p className="p-8 text-center text-gray-500">Tidak ada transaksi ditemukan.</p>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Item Produk</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Dibayar</TableHead>
                <TableHead className="text-right">Kembalian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-gray-50">
                  <TableCell className="font-bold text-blue-600">{tx.invoice}</TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {new Date(tx.createdAt).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="font-semibold">{tx.customerName}</TableCell>
                  <TableCell>
                    <div className="space-y-0.5 text-xs">
                      {tx.items?.map((item, idx) => (
                        <div key={idx} className="text-gray-700">
                          • {item.product?.name || "Produk"} ({item.quantity}x @ {formatRupiah(item.price)})
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                      {tx.paymentMethod}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold text-sm">
                    {formatRupiah(tx.totalAmount)}
                  </TableCell>
                  <TableCell className="text-right text-xs">
                    {formatRupiah(tx.inputPayment)}
                  </TableCell>
                  <TableCell className="text-right text-xs text-green-600 font-semibold">
                    {formatRupiah(tx.changeAmount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
