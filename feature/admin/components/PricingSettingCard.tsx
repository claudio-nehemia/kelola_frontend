"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { useQueryClient } from "@tanstack/react-query";
import { Coins, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActionUpdatePricing } from "../action/useActionUpdatePricing";
import { useGetPricing } from "../action/useGetPricing";

export function PricingSettingCard() {
  const { data: pricing, isLoading } = useGetPricing();
  const { mutate: updatePricing, isPending } = useActionUpdatePricing();
  const queryClient = useQueryClient();

  const [monthlyPrice, setMonthlyPrice] = useState("150000");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (pricing) {
      setMonthlyPrice(String(pricing.monthlyPrice || 150000));
      setDescription(pricing.description || "");
    }
  }, [pricing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const priceNum = Number(monthlyPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Tarif bulanan harus lebih dari 0");
      return;
    }

    updatePricing(
      { monthlyPrice: priceNum, description },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getPricing"] });
          toast.success("Tarif langganan bulanan berhasil disimpan!");
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Gagal memperbarui tarif bulanan";
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Card className="max-w-xl border shadow-sm bg-white">
      <CardHeader className="border-b bg-slate-50/50 pb-4">
        <div className="flex items-center gap-2.5 text-[#041336]">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
            <Coins size={22} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">
              Tarif Langganan Toko per Bulan
            </CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">
              Tarif ini menjadi acuan biaya otomatis saat pendaftaran atau perpanjangan kontrak toko kasir.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {isLoading ? (
          <p className="text-xs text-gray-400">Memuat data tarif...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Biaya Langganan / Bulan (Rp) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-xs">
                  Rp
                </span>
                <Input
                  type="number"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  className="pl-9 font-bold text-base"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-500">
                Pratinjau tampilan:{" "}
                <strong className="text-green-700 font-bold">
                  {formatRupiah(Number(monthlyPrice) || 0)} / bulan
                </strong>
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Keterangan / Paket
              </label>
              <Input
                placeholder="cth: Paket Standar All-in-One POS Kelola Toko"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#041336] hover:bg-[#09225e] text-white font-bold px-6 flex items-center gap-2"
              >
                <Save size={16} />
                <span>{isPending ? "Menyimpan..." : "Simpan Tarif"}</span>
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
