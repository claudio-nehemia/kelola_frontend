"use client";

import { PricingSettingCard } from "@/feature/admin/components/PricingSettingCard";

export default function PricingSettingPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#041336]">
          Pengaturan Biaya Kontrak Toko
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Tentukan harga langganan bulanan yang berlaku untuk seluruh akun Admin Kasir di sistem Kelola Toko.
        </p>
      </div>

      <PricingSettingCard />
    </div>
  );
}
