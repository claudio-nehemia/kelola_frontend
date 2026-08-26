import { UsersView } from "@/feature/users/views/UsersView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Pengguna | Kelola Toko",
  description: "Kelola akun pengguna, staf, dan hak akses peran.",
};

export default function UsersPage() {
  return <UsersView />;
}
