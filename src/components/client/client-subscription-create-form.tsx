"use client";

import { stripeCreateCheckoutSessionIdAction } from "@/app/actions/stripe/stripe-create-checkout-session-id.action";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { toaster } from "@/components/ui/toaster";
import { createListCollection } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const dataPackage = createListCollection({
  items: [
    { label: "$299 Data Package", value: "299" },
    { label: "$499 Data Package", value: "499" },
  ],
});

const formSchema = z.object({
  sdrManagerQuantity: z.number().int().max(1),
  sdrQuantity: z.number().int(),
  sdrDataPackage: z.enum(["299", "499"]),
});

export type IClientSubscriptionCreateFormProps = {};

const ClientSubscriptionCreateForm: React.FC<
  IClientSubscriptionCreateFormProps
> = () => {
  const [amount, setAmount] = useState<number>(0.0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      sdrManagerQuantity: 0,
      sdrQuantity: 1,
    },
  });

  const handleSubmit = async (input: z.infer<typeof formSchema>) => {
    try {
      toaster.create({
        title: "Not implemented",
        description: "This feature is not implemented yet.",
        type: "success",
      });
      const stripe = await stripePromise;
      if (!stripe) {
        toaster.create({
          title: "Something went wrong loading stripe",
          description: "Please try again later.",
          type: "error",
        });
        return;
      }

      const inputData = {
        ...input,
        payrollFeeAmount: Math.round(amount * 0.04),
      };

      const checkoutSessionId = await stripeCreateCheckoutSessionIdAction(
        inputData
      );

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSessionId,
      });

      if (result.error) {
        toaster.create({
          title: "Something went wrong",
          description: "Please try again later.",
          type: "error",
        });
      }
    } catch (error) {
      toaster.create({
        title: "Subscription creation failed",
        description: "Please try again later.",
        type: "error",
      });
    }
  };

  const {
    formState: { errors },
    formState: { isValid },
    formState: { isSubmitting },
    control,
    watch,
  } = form;

  const formValues = watch();

  useEffect(() => {
    // todo refactor hard coded prices
    let total = 0;
    total += formValues.sdrManagerQuantity * 150;
    total += formValues.sdrQuantity * 200;
    if (formValues.sdrDataPackage === "499") {
      total += 499;
    }
    setAmount(total);
  }, [formValues]);

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-4"
    >
      <Field
        label="SDR Manager"
        invalid={!!errors.sdrManagerQuantity}
        errorText={errors.sdrManagerQuantity?.message}
      >
        <Controller
          name="sdrManagerQuantity"
          control={control}
          render={({ field }) => (
            <NumberInputRoot
              disabled={field.disabled}
              name={field.name}
              value={field.value.toString()}
              onValueChange={({ value }) => {
                field.onChange(Number(value));
              }}
              className="w-full"
              min={0}
              max={1}
            >
              <NumberInputField onBlur={field.onBlur} />
            </NumberInputRoot>
          )}
        />
      </Field>

      <Field
        label="SDR"
        invalid={!!errors.sdrQuantity}
        errorText={errors.sdrQuantity?.message}
      >
        <Controller
          name="sdrQuantity"
          control={control}
          render={({ field }) => (
            <NumberInputRoot
              disabled={field.disabled}
              name={field.name}
              value={field.value.toString()}
              onValueChange={({ value }) => {
                field.onChange(Number(value));
              }}
              className="w-full"
              min={1}
              max={100}
            >
              <NumberInputField onBlur={field.onBlur} />
            </NumberInputRoot>
          )}
        />
      </Field>

      <Field
        label="Data Package"
        invalid={!!errors.sdrDataPackage}
        errorText={errors.sdrDataPackage?.message}
      >
        <Controller
          control={control}
          name="sdrDataPackage"
          render={({ field }) => (
            <SelectRoot
              name={field.name}
              value={field.value ? [field.value] : undefined}
              onValueChange={({ value }) => field.onChange(value[0])}
              onInteractOutside={() => field.onBlur()}
              collection={dataPackage}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Select Data Package" />
              </SelectTrigger>
              <SelectContent>
                {dataPackage.items.map((dp) => (
                  <SelectItem
                    item={dp}
                    key={dp.value}
                  >
                    {dp.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
        />
      </Field>

      <div className="w-full flex justify-end pt-4">
        <Button
          className=""
          type="submit"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          ${amount ? amount : amount.toFixed(2)} — Proceed to Checkout
        </Button>
      </div>
    </form>
  );
};

ClientSubscriptionCreateForm.displayName = "ClientSubscriptionCreateForm";

export default ClientSubscriptionCreateForm;
