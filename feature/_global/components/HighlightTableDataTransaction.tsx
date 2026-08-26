import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface transactionHighlight {
  transactionId: string;
  pelanggan: string;
  tanggal: string;
  total: string;
}

export function HighlightTableDataTransaction({
  dataTransaction,
}: {
  dataTransaction: transactionHighlight[];
}) {
  return (
    <div className="border-2 w-full rounded-md px-4">
      <div className="p-2 flex justify-between items-center">
        <h1 className="text-lg font-bold mb-1">Tabel Transaksi</h1>
        <Link href="/detail-transaction">
          <p className="text-blue-500 underline hover:cursor-pointer text-sm underline-offset-4 hover:text-blue-700">
            selengkapnya
          </p>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">No</TableHead>
            <TableHead>Pelanggan</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dataTransaction.map((d) => (
            <TableRow key={d.transactionId}>
              <TableCell className="font-medium">{d.transactionId}</TableCell>
              <TableCell>{d.pelanggan}</TableCell>
              <TableCell>{d.tanggal}</TableCell>
              <TableCell className="text-right">{d.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
