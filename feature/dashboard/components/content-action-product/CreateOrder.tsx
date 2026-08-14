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
import { AddOrderSchema, validationAddOrder } from "@/schema/validation-add-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Step1CreateOrder } from "../step-create-order/Step1CreateOrder";
import { Step2CreateOrder } from "../step-create-order/Step2CreateOrder";
import { Step3CreateOrder } from "../step-create-order/Step3CreateOrder";
import { Step4CreateOrder } from "../step-create-order/Step4CreateOrder";
import { FooterCreateOrder } from "../step-create-order/FooterCreateOrder";
import { useCreateTransaction } from "@/hooks/useTransactions";

export function CreateOrder() {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const createTransactionMutation = useCreateTransaction();

  const form = useForm<any>({
    resolver: zodResolver(AddOrderSchema),
    defaultValues: {
      nameCustomer: "",
      paymentMethod: "Cash",
      inputPayment: 0,
      listItemProduct: [],
    },
  });

  const { handleSubmit, reset } = form;
  const [step, setStep] = useState(1);

  const dataStep = [
    { step: 1, titleStep: "Nama Pelanggan" },
    { step: 2, titleStep: "Tambah Produk" },
    { step: 3, titleStep: "Pembayaran" },
    { step: 4, titleStep: "Konfirmasi" },
  ];

  function nextStep() {
    if (step < 4) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  async function onSubmitOrder(data: any) {
    setErrorMessage("");
    try {
      await createTransactionMutation.mutateAsync(data);
      reset({
        nameCustomer: "",
        paymentMethod: "Cash",
        inputPayment: 0,
        listItemProduct: [],
      });
      setStep(1);
      setIsOpen(false);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || "Gagal membuat pesanan");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button className="bg-green-500 hover:bg-green-400 px-7 py-5" />
        }
      >
        <ShoppingBasket />
        <p>Buat Pesanan</p>
      </DialogTrigger>

      <DialogContent className="gap-0.5 max-w-lg">
        <DialogTitle className="font-bold">Buat Pesanan</DialogTitle>

        <div className="flex justify-between my-5 pb-2">
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
            onSubmit={handleSubmit(onSubmitOrder)}
            className="flex flex-col w-full justify-center items-center"
          >
            {step === 1 && <Step1CreateOrder control={form} />}
            {step === 2 && <Step2CreateOrder control={form} />}
            {step === 3 && <Step3CreateOrder control={form} />}
            {step === 4 && <Step4CreateOrder control={form} />}

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <FooterCreateOrder
              nextStep={nextStep}
              prevStep={prevStep}
              step={step}
              isSubmitting={createTransactionMutation.isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
