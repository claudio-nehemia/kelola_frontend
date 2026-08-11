"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PackageSearch } from "lucide-react";
import { useState } from "react";

export function ManageProducts() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button className=" px-7 py-5" />}>
        <PackageSearch />
        <p>Kelola Produk</p>
      </DialogTrigger>

      <DialogContent>
        <h2>Kelola Produk</h2>
        <p>Ini adalah komponen untuk kelola produk.</p>
      </DialogContent>
    </Dialog>
  );
}
