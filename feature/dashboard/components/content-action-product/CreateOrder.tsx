"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import StepItem from "@/feature/_global/components/StepItem";
import {
  AddOrderSchema,
  validationAddOrder,
} from "@/schema/validation-add-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Step1CreateOrder } from "../step-create-order/Step1CreateOrder";
import { Step2CreateOrder } from "../step-create-order/Step2CreateOrder";
import { Step3CreateOrder } from "../step-create-order/Step3CreateOrder";
import { FooterCreateOrder } from "../step-create-order/FooterCreateOrder";
import { useActionAddOrder } from "../../action/useActionAddOrder";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function CreateOrder({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<validationAddOrder>({
    resolver: zodResolver(AddOrderSchema),
    defaultValues: {
      namaCustomer: "",
      inputPayment: 0,
      productSells: [],
    },
  });

  const { mutate: addOrder } = useActionAddOrder();

  function submitForm(data: validationAddOrder) {
    addOrder(
      { data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["get10ProductsAvailable"] });
          queryClient.invalidateQueries({ queryKey: ["get10ProductsNotAvailable"] });
          queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
          queryClient.invalidateQueries({ queryKey: ["getAllProductAvailable"] });
          toast.success("Pesanan berhasil dibuat!");
          reset();
          setStep(1);
          setIsOpen(false);
        },
        onError: () => {
          toast.error("Gagal membuat pesanan!");
        },
      },
    );
  }

  const { handleSubmit, reset } = form;

  const [step, setStep] = useState(1);

  const dataStep = [
    { step: 1, titleStep: "Nama Pelanggan" },
    { step: 2, titleStep: "Tambah Produk" },
    { step: 3, titleStep: "Pembayaran" },
  ];

  function nextStep() {
    if (step < 3) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            className={`bg-green-500 hover:bg-green-400 px-7 py-5 ${className || ""}`}
          />
        }
      >
        <ShoppingBasket />
        <p>Buat Pesanan</p>
      </DialogTrigger>

      <DialogContent className="gap-0.5">
        <DialogTitle className="font-bold">Buat Pesanan</DialogTitle>

        <div className="flex justify-around my-5 pb-2">
          {dataStep.map((item) => (
            <StepItem
              key={item.step}
              step={item.step}
              currentStep={step}
              titleStep={item.titleStep}
            />
          ))}
        </div>
        <Form {...form}>
          <form
            className="flex flex-col w-full justify-center items-center"
            onSubmit={handleSubmit(submitForm)}
          >
            {step === 1 && <Step1CreateOrder control={form} />}
            {step === 2 && <Step2CreateOrder control={form} />}
            {step === 3 && <Step3CreateOrder control={form} />}

            <FooterCreateOrder
              nextStep={nextStep}
              prevStep={prevStep}
              step={step}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
