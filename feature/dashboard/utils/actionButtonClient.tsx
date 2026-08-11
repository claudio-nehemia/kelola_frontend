import { Button } from "@/components/ui/button";
import { AddCategory } from "../components/content-action-product/AddCategory";
import { AddProduct } from "../components/content-action-product/AddProduct";
import { CreateOrder } from "../components/content-action-product/CreateOrder";
import { PackageSearch } from "lucide-react";
import Link from "next/link";

export const actionButtonClient = [
  {
    nameButton: "Buat Pesanan",
    component: <CreateOrder />,
  },
  {
    nameButton: "Tambah Produk",
    component: <AddProduct mode="add" />,
  },
  {
    nameButton: "Tambah Kategori",
    component: <AddCategory />,
  },
  {
    nameButton: "Kelola Produk",
    component: (
      <Link href="/product-available">
        <Button className="px-7 py-5">
          <PackageSearch />
          <p>Kelola Produk</p>
        </Button>
      </Link>
    ),
  },
];
