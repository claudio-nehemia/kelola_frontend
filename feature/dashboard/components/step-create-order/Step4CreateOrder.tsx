import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";

export function Step4CreateOrder({ control }: { control: any }) {
  const { watch } = control;
  const formValues = watch();

  const customerName = formValues.nameCustomer || "Umum";
  const paymentMethod = formValues.paymentMethod || "Cash";
  const items = formValues.listItemProduct || [];
  const inputPayment = Number(formValues.inputPayment || 0);

  const totalAmount = items.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const changeAmount = Math.max(0, inputPayment - totalAmount);

  return (
    <div className="w-full space-y-4 py-2">
      <h3 className="font-bold text-lg border-b pb-2">Konfirmasi Pesanan</h3>

      <div className="flex justify-between items-center text-sm bg-gray-50 p-2.5 rounded border">
        <div>
          <span className="text-gray-500 text-xs block">Customer</span>
          <span className="font-bold">{customerName}</span>
        </div>
        <div className="text-right">
          <span className="text-gray-500 text-xs block">Metode Pembayaran</span>
          <span className="font-bold text-blue-600 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-xs">
            {paymentMethod}
          </span>
        </div>
      </div>

      <div className="border rounded-md p-3 bg-white space-y-2 text-sm max-h-40 overflow-y-auto">
        <div className="font-semibold border-b pb-1 flex justify-between text-xs text-gray-500">
          <span>Produk</span>
          <span>Qty x Harga</span>
        </div>
        {items.length === 0 ? (
          <p className="text-gray-500 text-xs">Belum ada item dipilih.</p>
        ) : (
          items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center text-xs border-b last:border-0 py-1">
              <span className="font-medium">{item.name}</span>
              <span>
                {item.quantity} x {formatRupiah(item.price || 0)} ={" "}
                <span className="font-bold">{formatRupiah((item.price || 0) * item.quantity)}</span>
              </span>
            </div>
          ))
        )}
      </div>

      <div className="space-y-1.5 text-sm pt-2 border-t">
        <div className="flex justify-between">
          <span>Total Tagihan:</span>
          <span className="font-bold text-base">{formatRupiah(totalAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Jumlah Dibayar ({paymentMethod}):</span>
          <span className="font-semibold">{formatRupiah(inputPayment)}</span>
        </div>
        <div className="flex justify-between text-green-600 font-bold text-base">
          <span>Kembalian:</span>
          <span>{formatRupiah(changeAmount)}</span>
        </div>
      </div>
    </div>
  );
}
