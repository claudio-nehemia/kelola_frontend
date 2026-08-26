"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { useGetKasirMonitoring } from "@/feature/admin/action/useGetKasirMonitoring";
import {
  ArrowLeft,
  Calendar,
  Layers,
  Package,
  Phone,
  ReceiptText,
  Store,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function KasirMonitoringPage() {
  const params = useParams();
  const kasirId = params.id as string;
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "transactions">("products");

  const { data, isLoading } = useGetKasirMonitoring(kasirId);

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Memuat data monitoring toko kasir...
      </div>
    );
  }

  if (!data || !data.user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Data toko kasir tidak ditemukan.</p>
        <Link href="/admin/kasir" className="text-blue-600 underline text-xs mt-2 inline-block">
          Kembali ke Daftar Kasir
        </Link>
      </div>
    );
  }

  const { user, summary, products, categories, transactions } = data;

  return (
    <div className="space-y-6 w-full">
      {/* Top Header with Back Button */}
      <div className="flex items-center gap-3">
        <Link href="/admin/kasir">
          <Button variant="outline" size="sm" className="h-9 px-3">
            <ArrowLeft size={16} className="mr-1" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#041336] flex items-center gap-2">
            <Store size={22} className="text-blue-600" />
            <span>{user.storeName || user.name}</span>
          </h1>
          <p className="text-xs text-gray-500">
            Pemilik: <strong>{user.name}</strong> (@{user.username}) &bull;{" "}
            {user.phone && `HP: ${user.phone}`} &bull; Masa Aktif s/d:{" "}
            {user.contractEnd
              ? new Date(user.contractEnd).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Belum diset"}
          </p>
        </div>
      </div>

      {/* Overview Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700">
              <Package size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Produk</p>
              <h3 className="text-xl font-bold text-gray-900">
                {summary.totalProducts}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Kategori</p>
              <h3 className="text-xl font-bold text-gray-900">
                {summary.totalCategories}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700">
              <ReceiptText size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Transaksi Kasir</p>
              <h3 className="text-xl font-bold text-gray-900">
                {summary.totalTransactions}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-green-50 text-green-700">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Omset Penjualan</p>
              <h3 className="text-base font-bold text-green-700">
                {formatRupiah(summary.totalOmset)}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-2.5 px-4 text-xs font-bold transition-all border-b-2 ${
            activeTab === "products"
              ? "border-[#041336] text-[#041336]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Produk Toko ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`pb-2.5 px-4 text-xs font-bold transition-all border-b-2 ${
            activeTab === "categories"
              ? "border-[#041336] text-[#041336]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Kategori ({categories.length})
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`pb-2.5 px-4 text-xs font-bold transition-all border-b-2 ${
            activeTab === "transactions"
              ? "border-[#041336] text-[#041336]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Riwayat Penjualan ({transactions.length})
        </button>
      </div>

      {/* Tab 1: Products */}
      {activeTab === "products" && (
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-12 text-center">No</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Harga Modal</TableHead>
                <TableHead className="text-right">Harga Jual</TableHead>
                <TableHead className="text-right">Margin Profit</TableHead>
                <TableHead className="text-center">Stok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-xs text-gray-500">
                    Kasir ini belum menambahkan produk.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p, idx) => {
                  const profit = p.sellPrice - p.costPrice;
                  return (
                    <TableRow key={p.id} className="hover:bg-slate-50/80">
                      <TableCell className="text-center font-medium text-xs text-gray-500">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-bold text-xs text-gray-900">
                        {p.name}
                      </TableCell>
                      <TableCell className="text-xs text-gray-600">
                        {p.category?.name || "-"}
                      </TableCell>
                      <TableCell className="text-right text-xs text-gray-600">
                        {formatRupiah(p.costPrice)}
                      </TableCell>
                      <TableCell className="text-right text-xs font-bold text-gray-900">
                        {formatRupiah(p.sellPrice)}
                      </TableCell>
                      <TableCell className="text-right text-xs font-bold text-green-700">
                        +{formatRupiah(profit)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold ${
                            p.stock > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.stock}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Tab 2: Categories */}
      {activeTab === "categories" && (
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden max-w-xl">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-12 text-center">No</TableHead>
                <TableHead>Nama Kategori</TableHead>
                <TableHead className="text-center">Jumlah Produk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-xs text-gray-500">
                    Belum ada kategori yang dibuat.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((c, idx) => (
                  <TableRow key={c.id}>
                    <TableCell className="text-center text-xs text-gray-500">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="text-xs font-bold text-gray-900">
                      {c.name}
                    </TableCell>
                    <TableCell className="text-center text-xs font-semibold text-gray-600">
                      {c._count?.products || 0} Produk
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Tab 3: Transactions */}
      {activeTab === "transactions" && (
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-12 text-center">No</TableHead>
                <TableHead>No Invoice</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-center">Item Dibeli</TableHead>
                <TableHead className="text-right">Total Transaksi</TableHead>
                <TableHead className="text-center">Metode Bayar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-xs text-gray-500">
                    Kasir ini belum memiliki riwayat transaksi penjualan.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((t, idx) => (
                  <TableRow key={t.id} className="hover:bg-slate-50/80">
                    <TableCell className="text-center text-xs text-gray-500">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-blue-600">
                      {t.invoice}
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">
                      {new Date(t.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-xs text-gray-800 font-medium">
                      {t.customerName}
                    </TableCell>
                    <TableCell className="text-center text-xs text-gray-600">
                      {t.items?.length || 0} Item
                    </TableCell>
                    <TableCell className="text-right text-xs font-bold text-gray-900">
                      {formatRupiah(t.totalAmount)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-gray-700">
                        {t.paymentMethod}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
