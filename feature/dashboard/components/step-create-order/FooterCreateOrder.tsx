import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

export function FooterCreateOrder({
  step,
  nextStep,
  prevStep,
}: {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <DialogFooter className="bg-white border-0 mt-4 flex gap-2 justify-end w-full">
      <Button
        type="button"
        onClick={prevStep}
        disabled={step === 1}
        className="bg-white hover:bg-gray-100 text-black border border-black w-42"
      >
        Kembali
      </Button>
      {step === 3 ? (
        <Button className="w-42 bg-primary" onClick={nextStep} type="submit">
          Simpan
        </Button>
      ) : (
        <Button className="w-42 bg-primary" type="button" onClick={nextStep}>
          Selanjutnya
        </Button>
      )}
    </DialogFooter>
  );
}
