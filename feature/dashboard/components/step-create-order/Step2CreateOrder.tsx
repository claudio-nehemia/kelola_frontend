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
import { useGetAllProduct } from "../../action/useGetAllProduct";

export function Step2CreateOrder({ control }: { control: any }) {
  const { control: formControl } = control;
  const [searchValue, setSearchValue] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<{
    productId: string;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const { data: product } = useGetAllProduct({ search: searchValue });

  interface OrderItem {
    productId: string;
    quantity: number;
  }

  return (
    <>
      <FormField
        name="productSells"
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
                <DropdownMenuTrigger className="w-full">
                  <SearchProduct
                    value={searchValue}
                    setValue={setSearchValue}
                    active={active}
                    setActive={setActive}
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="max-h-50 scroll-auto gap-1">
                  {product?.map((prod) => (
                    <DropdownMenuItem key={prod.id}>
                      <div
                        className="cursor-pointer w-full"
                        onClick={() => {
                          setSelectedProduct({ productId: prod.id });
                          setQuantity(1);
                          setIsOpen(true);
                        }}
                      >
                        {prod.name} - Rp{" "}
                        {prod.priceSell.toLocaleString("id-ID")}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-96">
                  <DialogTitle className="font-bold">
                    {selectedProduct?.productId
                      ? product?.find((p) => p.id === selectedProduct.productId)
                          ?.name
                      : "Selected Product"}
                  </DialogTitle>
                  <DialogDescription>
                    Tambahkan jumlah produk yang ingin Anda pesan.
                  </DialogDescription>

                  <div className="flex items-center gap-2 justify-center my-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setQuantity((prev) => Math.max(1, prev - 1));
                      }}
                    >
                      -
                    </Button>
                    <span className="text-xl font-bold w-10 text-center">{quantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setQuantity((prev) => Math.min(100, prev + 1));
                      }}
                    >
                      +
                    </Button>
                  </div>
                  <Button type="button" onClick={handleToCart} className="w-full">
                    Tambah ke Keranjang
                  </Button>
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
                  <p className="text-gray-500 text-sm">
                    Belum ada produk yang dipilih.
                  </p>
                )}
                {currentList.length > 0 && (
                  <div className="w-full space-y-1">
                    {currentList.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between w-full items-center py-1 border-b last:border-0"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold">
                            {item.productId
                              ? product?.find((p) => p.id === item.productId)
                                  ?.name
                              : "Product Not Found"}
                          </span>
                          <span className="text-sm text-gray-600">
                            Rp{" "}
                            {item.productId
                              ? product
                                  ?.find((p) => p.id === item.productId)
                                  ?.priceSell.toLocaleString("id-ID")
                              : "0"}
                          </span>
                        </div>
                        <span className="text-md mr-5 font-semibold">
                          {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 border-t pt-2 w-full flex justify-between">
                  <span className="font-bold text-md">Total Harga:</span>
                  <span className="font-bold text-md text-blue-600">
                    Rp{" "}
                    {currentList
                      .reduce((total, item) => {
                        const selected = product?.find(
                          (p) => p.id === item.productId,
                        );

                        return (
                          total +
                          (Number(selected?.priceSell) || 0) * item.quantity
                        );
                      }, 0)
                      .toLocaleString("id-ID")}
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
