import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export function DetailTransaction({
  namaPelanggan,
  detailTransaksi,
  totalTransaksi,
  totalKeuntungan,
}: {
  namaPelanggan: string;
  detailTransaksi: string[] | null;
  totalTransaksi: number;
  totalKeuntungan: number;
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <Info />
          </Button>
        }
      />

      <DialogContent>
        <DialogTitle className="font-bold">Detail Transaksi</DialogTitle>
        <p>{namaPelanggan}</p>
      </DialogContent>
    </Dialog>
  );
}
