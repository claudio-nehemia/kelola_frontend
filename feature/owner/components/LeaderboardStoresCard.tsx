"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { Award, Package, ReceiptText, Store, Trophy } from "lucide-react";
import { ITopStoreItem } from "../models/ownerModel";

export function LeaderboardStoresCard({ stores }: { stores: ITopStoreItem[] }) {
  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader className="border-b pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 text-amber-600">
          <Trophy size={20} />
          <CardTitle className="text-base font-bold text-gray-900">
            Top 5 Toko Retail Terlaris (Platform GMV)
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {stores.length === 0 ? (
          <p className="text-xs text-gray-500 py-6 text-center">
            Belum ada data transaksi toko yang tercatat.
          </p>
        ) : (
          stores.map((store, index) => (
            <div
              key={store.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50/70 border border-slate-200/80 hover:bg-slate-100/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs shadow-sm ${
                    index === 0
                      ? "bg-amber-400 text-amber-950"
                      : index === 1
                      ? "bg-slate-300 text-slate-900"
                      : index === 2
                      ? "bg-amber-700 text-amber-100"
                      : "bg-slate-100 text-gray-700 border"
                  }`}
                >
                  {index + 1}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                    <Store size={14} className="text-blue-600" />
                    {store.storeName}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-2">
                    <span>Pemilik: {store.name}</span>
                    &bull;
                    <span className="flex items-center gap-1">
                      <Package size={11} /> {store.totalProducts} Produk
                    </span>
                    &bull;
                    <span className="flex items-center gap-1">
                      <ReceiptText size={11} /> {store.totalTransactions} Transaksi
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-gray-500 font-medium">
                  Total Omset Toko
                </p>
                <h4 className="text-sm sm:text-base font-extrabold text-green-700 font-mono">
                  {formatRupiah(store.totalOmset)}
                </h4>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
