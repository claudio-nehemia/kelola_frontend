"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField, FormItem } from "@/components/ui/form";
import { SearchProduct } from "@/feature/_global/components/SearchProduct";
import { useGetAllProduct } from "../../action/useGetAllProduct";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export function Step2CreateOrder({ control }: { control: any }) {
  const { control: formControl } = control;
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: dbProducts = [], isLoading } = useGetAllProduct({
    search: searchValue,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const availableProducts = dbProducts.filter((p: any) => p.stock > 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FormField
      name="listItemProduct"
      control={formControl}
      render={({ field }) => {
        const currentList: OrderItem[] = field.value || [];

        const handleSelectProduct = (p: any) => {
          setSelectedProduct({
            productId: p.id,
            name: p.name || p.productName || "",
            price: p.priceSell || p.sellPrice || 0,
            quantity: 1,
          });
          setQuantity(1);
          setShowSuggestions(false);
          setIsModalOpen(true);
        };

        const handleAddToCart = () => {
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
          setIsModalOpen(false);
        };

        const handleUpdateItemQuantity = (productId: string, delta: number) => {
          const updatedList = currentList
            .map((item) => {
              if (item.productId === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter((item): item is OrderItem => item !== null);

          field.onChange(updatedList);
        };

        const handleRemoveItem = (productId: string) => {
          const updatedList = currentList.filter(
            (item) => item.productId !== productId,
          );
          field.onChange(updatedList);
        };

        const totalAmount = currentList.reduce(
          (sum, item) => sum + (item.price || 0) * item.quantity,
          0,
        );

        return (
          <FormItem className="w-full">
            <div ref={containerRef} className="relative w-full">
              <div onFocus={() => setShowSuggestions(true)}>
                <SearchProduct
                  value={searchValue}
                  setValue={(val) => {
                    setSearchValue(val);
                    setShowSuggestions(true);
                  }}
                  className="w-full max-w-full"
                />
              </div>

              {showSuggestions && (
                <div className="absolute top-12 left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {isLoading ? (
                    <p className="p-3 text-xs text-gray-500 text-center">
                      Memuat produk...
                    </p>
                  ) : availableProducts.length === 0 ? (
                    <p className="p-3 text-xs text-gray-500 text-center">
                      {searchValue
                        ? "Produk tidak ditemukan."
                        : "Pilih atau cari produk..."}
                    </p>
                  ) : (
                    availableProducts.map((product: any) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="p-2.5 px-4 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b last:border-0 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-sm">
                            {product.name || product.productName}
                          </p>
                          <p className="text-xs text-gray-500">
                            Stok: {product.stock}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-blue-600">
                          {formatRupiah(
                            product.priceSell || product.sellPrice || 0,
                          )}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="w-96">
                <DialogTitle className="font-bold">
                  {selectedProduct?.name || "Jumlah Pesanan"}
                </DialogTitle>
                <DialogDescription>
                  Masukkan jumlah unit yang ingin dipesan.
                </DialogDescription>

                <div className="flex items-center gap-4 justify-center py-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((prev) => Math.min(100, prev + 1))}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full"
                >
                  Tambah ke Keranjang (
                  {formatRupiah((selectedProduct?.price || 0) * quantity)})
                </Button>
              </DialogContent>
            </Dialog>

            <div className="flex flex-col items-start w-full justify-start mt-6 border-t pt-4">
              <div className="flex justify-between w-full font-bold text-sm mb-2 items-center text-gray-700">
                <h2>List Pesanan ({currentList.length})</h2>
                <h2>Subtotal</h2>
              </div>

              {currentList.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center w-full">
                  Belum ada produk yang dipilih. Klik pencarian di atas untuk memilih produk.
                </p>
              ) : (
                <div className="w-full space-y-2 max-h-52 overflow-y-auto pr-1">
                  {currentList.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md border"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-xs text-gray-500">
                          {formatRupiah(item.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 border bg-white rounded px-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateItemQuantity(item.productId, -1)
                            }
                            className="p-1 hover:text-red-600 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-semibold text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateItemQuantity(item.productId, 1)
                            }
                            className="p-1 hover:text-green-600 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-bold text-sm min-w-[80px] text-right">
                          {formatRupiah(item.price * item.quantity)}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-3 border-t w-full flex justify-between items-center font-bold text-base">
                <span>Total Harga:</span>
                <span className="text-blue-600 text-lg">
                  {formatRupiah(totalAmount)}
                </span>
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
}
