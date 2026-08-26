import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

export function FooterCreateOrder({
  step,
  nextStep,
  prevStep,
  isSubmitting = false,
}: {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting?: boolean;
}) {
  return (
    <DialogFooter className="bg-white border-0 mt-4 flex gap-2 justify-end w-full">
      <Button
        type="button"
        onClick={prevStep}
        disabled={step === 1 || isSubmitting}
        className="bg-white hover:bg-gray-100 text-black border border-black w-36"
      >
        Kembali
      </Button>

      {step === 4 ? (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-500 w-36 text-white"
        >
          {isSubmitting ? "Memproses..." : "Simpan Pesanan"}
        </Button>
      ) : (
        <Button
          type="button"
          className="w-36"
          onClick={nextStep}
        >
          Selanjutnya
        </Button>
      )}
    </DialogFooter>
  );
}
