import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DetailTransaction } from "@/feature/dashboard/components/DetailTransaction";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { Info } from "lucide-react";

interface transactionHighlight {
  transactionId: string;
  pelanggan: string;
  tanggal: string;
  productDetail: string[];
  priceSell: number;
  profitSell: number;
}

export function TableDataTransaction({
  dataTransaction,
}: {
  dataTransaction: transactionHighlight[];
}) {
  const totalPenjualan = dataTransaction.reduce(
    (acc, curr) => acc + curr.priceSell,
    0,
  );

  const totalProfit = dataTransaction.reduce(
    (acc, curr) => acc + curr.profitSell,
    0,
  );

  return (
    <div className="flex w-325 px-7 py-3 justify-center border-2 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">No</TableHead>
            <TableHead>Pelanggan</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Total Transaksi (Rp)</TableHead>
            <TableHead>Keuntungan Bersih (Rp)</TableHead>
            <TableHead className="text-right">Detail</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dataTransaction.map((d) => (
            <TableRow key={d.transactionId}>
              <TableCell className="font-medium">{d.transactionId}</TableCell>
              <TableCell>{d.pelanggan}</TableCell>
              <TableCell>{d.tanggal}</TableCell>
              <TableCell>{d.priceSell}</TableCell>
              <TableCell>{d.profitSell}</TableCell>
              <TableCell className="text-right">
                <DetailTransaction
                  namaPelanggan={d.pelanggan}
                  detailTransaksi={d.productDetail}
                  totalTransaksi={d.priceSell}
                  totalKeuntungan={d.profitSell}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Penjualan</TableCell>
            <TableCell className="text-right">
              {formatRupiah(totalPenjualan)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}>Total Keuntungan</TableCell>
            <TableCell className="text-right">
              {formatRupiah(totalProfit)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
