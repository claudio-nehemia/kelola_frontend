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
import { Step4CreateOrder } from "../step-create-order/Step4CreateOrder";
import { FooterCreateOrder } from "../step-create-order/FooterCreateOrder";
import { useActionAddOrder } from "../../action/useActionAddOrder";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function CreateOrder({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);

  const form = useForm<validationAddOrder>({
    resolver: zodResolver(AddOrderSchema),
    defaultValues: {
      namaCustomer: "",
      nameCustomer: "",
      paymentMethod: "Cash",
      inputPayment: 0,
      listItemProduct: [],
    },
  });

  const queryClient = useQueryClient();
  const { mutate: addOrder, isPending } = useActionAddOrder();

  const dataStep = [
    { step: 1, titleStep: "Pelanggan" },
    { step: 2, titleStep: "Produk" },
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

  function onSubmitOrder(data: validationAddOrder) {
    setErrorMessage("");
    const customerName = data.namaCustomer || data.nameCustomer || "Umum";
    const items = data.listItemProduct || [];

    if (items.length === 0) {
      setErrorMessage("Minimal satu produk harus ditambahkan!");
      toast.error("Minimal satu produk harus ditambahkan!");
      setStep(2);
      return;
    }

    const payload: validationAddOrder = {
      ...data,
      namaCustomer: customerName,
      nameCustomer: customerName,
      productSells: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    addOrder(
      { data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          queryClient.invalidateQueries({ queryKey: ["bestSellers"] });
          queryClient.invalidateQueries({
            queryKey: ["get10ProductsAvailable"],
          });
          queryClient.invalidateQueries({
            queryKey: ["get10ProductsNotAvailable"],
          });
          queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
          queryClient.invalidateQueries({
            queryKey: ["getAllProductAvailable"],
          });
          queryClient.invalidateQueries({ queryKey: ["products"] });
          toast.success("Pesanan berhasil dibuat!");
          form.reset({
            namaCustomer: "",
            nameCustomer: "",
            paymentMethod: "Cash",
            inputPayment: 0,
            listItemProduct: [],
          });
          setStep(1);
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Gagal membuat pesanan!";
          setErrorMessage(msg);
          toast.error(msg);
        },
      },
    );
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

      <DialogContent className="gap-0.5 max-w-lg">
        <DialogTitle className="font-bold">Buat Pesanan</DialogTitle>

        <div className="flex justify-around my-4 pb-2">
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
            onSubmit={form.handleSubmit(onSubmitOrder)}
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
              isSubmitting={isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
