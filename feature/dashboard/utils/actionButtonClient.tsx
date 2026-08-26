import { Button } from "@/components/ui/button";
import { AddCategory } from "../components/content-action-product/AddCategory";
import { AddProduct } from "../components/content-action-product/AddProduct";
import { CreateOrder } from "../components/content-action-product/CreateOrder";
import { PackageSearch } from "lucide-react";
import Link from "next/link";

export const actionButtonClient = [
  {
    nameButton: "Buat Pesanan",
    component: <CreateOrder className="lg:w-57 xl:w-55" />,
  },
  {
    nameButton: "Tambah Produk",
    component: <AddProduct mode="add" className="lg:w-56 xl:w-55" />,
  },
  {
    nameButton: "Tambah Kategori",
    component: <AddCategory className="lg:w-60 xl:w-55" />,
  },
  {
    nameButton: "Kelola Produk",
    component: (
      <Link href="/manage-product">
        <Button className="px-10 py-5 bg-amber-300 hover:bg-amber-200 hover:cursor-pointer text-black font-bold">
          <PackageSearch />
          <p>Kelola Produk</p>
        </Button>
      </Link>
    ),
  },
];
