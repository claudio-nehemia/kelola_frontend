"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/feature/_global/utils/useDebounce";
import {
  Crown,
  Search,
  Shield,
  ShoppingBag,
  Users as UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { useGetAllUsers } from "../action/useGetAllUsers";
import { DialogAddUser } from "../components/DialogAddUser";
import { TableUsers } from "../components/TableUsers";

export function UsersContainer() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const debouncedSearch = useDebounce(searchValue, 300);

  const { data: users = [], isLoading } = useGetAllUsers({
    search: debouncedSearch,
    role: selectedRole === "all" ? undefined : selectedRole,
  });

  // Calculate quick statistics
  const totalUsers = users.length;
  const ownerCount = users.filter(
    (u) => (u.role || "").toLowerCase() === "owner",
  ).length;
  const adminCount = users.filter(
    (u) => (u.role || "").toLowerCase() === "admin",
  ).length;
  const cashierCount = users.filter(
    (u) => (u.role || "").toLowerCase() === "kasir",
  ).length;

  const roleFilterTabs = [
    { id: "all", label: "Semua Pengguna" },
    { id: "Owner", label: "Owner" },
    { id: "Admin", label: "Admin" },
    { id: "Kasir", label: "Kasir" },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#041336]">
            Manajemen Pengguna & Staff
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Kelola daftar akun, hak akses peran (Owner, Admin, Kasir), dan status staf toko.
          </p>
        </div>
        <DialogAddUser />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-slate-100 text-[#041336]">
              <UsersIcon size={22} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Total Staff</p>
              <h3 className="text-xl font-bold text-gray-900">{totalUsers}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700">
              <Crown size={22} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Owner (Pemilik)</p>
              <h3 className="text-xl font-bold text-gray-900">{ownerCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700">
              <Shield size={22} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Admin Toko</p>
              <h3 className="text-xl font-bold text-gray-900">{adminCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
              <ShoppingBag size={22} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Kasir (POS)</p>
              <h3 className="text-xl font-bold text-gray-900">{cashierCount}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Cari nama, username, email..."
            className="pl-9 h-10 border-gray-300"
          />
        </div>

        {/* Role Filter Tabs */}
        <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {roleFilterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRole(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                selectedRole === tab.id
                  ? "bg-[#041336] text-white shadow-sm"
                  : "bg-slate-100 text-gray-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <TableUsers users={users} isLoading={isLoading} />
    </div>
  );
}
