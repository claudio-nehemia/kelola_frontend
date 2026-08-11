"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormField, FormItem } from "@/components/ui/form";
import { SearchProduct } from "@/feature/_global/components/SearchProduct";
import { controlAddOrder } from "@/schema/validation-add-order";
import { useState } from "react";

export function Step2CreateOrder({ control }: { control: controlAddOrder }) {
  const { control: formControl } = control;
  const [searchValue, setSearchValue] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<{
    productId: string;
    name: string;
    price: number;
  } | null>(null);
  //   const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
  const [quantity, setQuantity] = useState(1);

  const [isOpen, setIsOpen] = useState(false);

  const products = [
    { productId: "1", name: "Big Mac", price: 25000 },
    { productId: "2", name: "McChicken", price: 22000 },
    { productId: "3", name: "French Fries", price: 15000 },
    { productId: "4", name: "Coca Cola", price: 10000 },
    { productId: "5", name: "McFlurry", price: 18000 },
  ];

  interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }
  return (
    <>
      <FormField
        name="listItemProduct"
        control={formControl}
        render={({ field }) => {
          const currentList: OrderItem[] = field.value || [];

          const handleToCart = () => {
            if (!selectedProduct || quantity <= 0) return;

            const existingIndex = currentList.findIndex(
              (item) => item.productId === selectedProduct.productId,
            );

            let updatedList: OrderItem[];

            if (existingIndex >= 0) {
              updatedList = [...currentList];
              updatedList[existingIndex].quantity += quantity;
            } else {
              updatedList = [...currentList, { ...selectedProduct, quantity }];
            }

            field.onChange(updatedList);

            setSelectedProduct(null);
            setQuantity(1);
            setIsOpen(false);
          };
          return (
            <FormItem className="w-full">
              <DropdownMenu>
                <DropdownMenuTrigger className="xl:w-88">
                  <SearchProduct
                    value={searchValue}
                    setValue={setSearchValue}
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="max-h-50 scroll-auto gap-1">
                  {products.map((product) => (
                    <DropdownMenuItem key={product.productId}>
                      <div
                        onClick={() => {
                          setSelectedProduct(product);
                          setQuantity(1);
                          setIsOpen(true);
                        }}
                      >
                        {product.name} - Rp {product.price.toLocaleString()}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="absolute left-8/11 w-96">
                  <DialogTitle className="font-bold">
                    {selectedProduct?.name || "Selected Product"}
                  </DialogTitle>
                  <DialogDescription>
                    Tambahkan jumlah produk yang ingin Anda pesan.
                  </DialogDescription>

                  <div className="flex items-center gap-2 justify-center">
                    <Button
                      onClick={() => {
                        setQuantity((prev) => Math.max(0, prev - 1));
                      }}
                    >
                      -
                    </Button>
                    <span className="text-xl font-bold">{quantity}</span>
                    <Button
                      onClick={() => {
                        setQuantity((prev) => Math.min(100, prev + 1));
                      }}
                    >
                      +
                    </Button>
                  </div>
                  <Button onClick={handleToCart}>Tambah ke Keranjang</Button>
                </DialogContent>
              </Dialog>

              <div
                id="selected-products"
                className="flex flex-col items-start w-full justify-start mt-6"
              >
                <div className="flex justify-between w-full font-bold text-md mb-2 pr-3 items-center">
                  <h2>List Pesanan</h2>
                  <h2 className="font-semibold">Qty</h2>
                </div>
                {currentList.length === 0 && (
                  <p className="text-gray-500">
                    Belum ada produk yang dipilih.
                  </p>
                )}
                {currentList.length > 0 && (
                  <div className="w-full">
                    {currentList.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between xl:w-88 items-center py-1"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold">{item.name}</span>
                          <span className="text-sm text-gray-600">
                            Rp {item.price.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-md mr-5 font-semibold">
                          {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5">
                  <span className="font-bold text-md">Total Harga:</span>
                  <span className="font-bold text-md ml-2">
                    Rp{" "}
                    {currentList
                      .map((item) => item.price * item.quantity)
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString()}
                  </span>
                </div>
              </div>
            </FormItem>
          );
        }}
      />
    </>
  );
}
