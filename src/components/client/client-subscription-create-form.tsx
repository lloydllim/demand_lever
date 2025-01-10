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

// Pricing constants
const PRICES = {
  SDR_MANAGER: 150,
  SDR: 200,
  DATA_PACKAGE: {
    "299": 299,
    "499": 499,
  },
};

// Data package options with labels
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
      const stripe = await stripePromise;
      if (!stripe) {
        toaster.create({
          title: "Error",
          description: "Stripe failed to load. Please try again later.",
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
          title: "Checkout Error",
          description: result.error.message,
          type: "error",
        });
      }
    } catch {
      toaster.create({
        title: "Submission Failed",
        description: "Please try again later.",
        type: "error",
      });
    }
  };

  const {
    formState: { errors, isValid, isSubmitting },
    control,
    watch,
  } = form;

  const formValues = watch();

  // Update total amount dynamically
  useEffect(() => {
    const total =
      formValues.sdrManagerQuantity * PRICES.SDR_MANAGER +
        formValues.sdrQuantity * PRICES.SDR +
        PRICES.DATA_PACKAGE[formValues.sdrDataPackage] || 0;
    setAmount(total);
  }, [formValues]);

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6"
    >
      {/* SDR Manager Field with Pricing */}
      <Field
        label={`SDR Manager`}
        invalid={!!errors.sdrManagerQuantity}
        errorText={errors.sdrManagerQuantity?.message}
      >
        <p className="text-xs text-gray-500">
          ${PRICES.SDR_MANAGER} per month
        </p>
        <Controller
          name="sdrManagerQuantity"
          control={control}
          render={({ field }) => (
            <NumberInputRoot
              disabled={field.disabled}
              name={field.name}
              value={field.value.toString()}
              onValueChange={({ value }) => field.onChange(Number(value))}
              className="w-full"
              min={0}
              max={1}
            >
              <NumberInputField onBlur={field.onBlur} />
            </NumberInputRoot>
          )}
        />
      </Field>

      {/* SDR Field with Pricing */}
      <Field
        label={`SDR`}
        invalid={!!errors.sdrQuantity}
        errorText={errors.sdrQuantity?.message}
      >
        <p className="text-xs text-gray-500">${PRICES.SDR} per month</p>
        <Controller
          name="sdrQuantity"
          control={control}
          render={({ field }) => (
            <NumberInputRoot
              disabled={field.disabled}
              name={field.name}
              value={field.value.toString()}
              onValueChange={({ value }) => field.onChange(Number(value))}
              className="w-full"
              min={1}
              max={100}
            >
              <NumberInputField onBlur={field.onBlur} />
            </NumberInputRoot>
          )}
        />
      </Field>

      {/* Data Package Field with Pricing */}
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
                <SelectValueText placeholder="Select a Data Package" />
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

      {/* Total Amount and Submit Button */}
      <div className="w-full flex justify-end pt-4">
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          ${amount.toFixed(2)} — Proceed to Checkout
        </Button>
      </div>
    </form>
  );
};

ClientSubscriptionCreateForm.displayName = "ClientSubscriptionCreateForm";

export default ClientSubscriptionCreateForm;
