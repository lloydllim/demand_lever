"use client";
import { stripeCreateCheckoutSessionIdAction } from "@/app/actions/stripe/stripe-create-checkout-session-id-as-client.action";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { StepperInput } from "@/components/ui/stepper-input";
import { toaster } from "@/components/ui/toaster";
import { createListCollection, Separator } from "@chakra-ui/react";
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

const ClientSubscriptionCreateForm: React.FC = () => {
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

    const result = await stripeCreateCheckoutSessionIdAction(inputData);

    if (result.error) {
      toaster.create({
        title: "Checkout Error",
        description: result.error,
        type: "error",
      });
    } else if (result.data) {
      const checkoutSessionId = result.data;
      toaster.create({
        description: "Redirecting to Stripe Checkout",
        type: "success",
      });
      await stripe.redirectToCheckout({
        sessionId: checkoutSessionId,
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
        labelAdditionalText={`$${PRICES.SDR_MANAGER} per month`}
        invalid={!!errors.sdrManagerQuantity}
        errorText={errors.sdrManagerQuantity?.message}
        helperText="Team leads who will oversee SDR operations"
      >
        <Controller
          name="sdrManagerQuantity"
          control={control}
          render={({ field }) => (
            <StepperInput
              onBlur={field.onBlur}
              min={0}
              max={1}
              value={field.value.toString()}
              onValueChange={({ value }) => field.onChange(Number(value))}
            />
          )}
        />
      </Field>

      {/* SDR Field with Pricing */}
      <Field
        label={`SDR Seats`}
        labelAdditionalText={`$${PRICES.SDR} per month`}
        invalid={!!errors.sdrQuantity}
        errorText={errors.sdrQuantity?.message}
        helperText="Sales Development Representatives who will generate leads"
      >
        <Controller
          name="sdrQuantity"
          control={control}
          render={({ field }) => (
            <StepperInput
              onBlur={field.onBlur}
              min={1}
              max={100}
              value={field.value.toString()}
              onValueChange={({ value }) => field.onChange(Number(value))}
            />
          )}
        />
      </Field>

      {/* Data Package Field with Pricing */}
      <Field
        label="Data Package"
        invalid={!!errors.sdrDataPackage}
        errorText={errors.sdrDataPackage?.message}
        helperText="Choose the data package that best fits your needs."
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

      <Separator />

      <h1 className="text-2xl font-bold">Order Summary</h1>

      <div className="space-y-4">
        {formValues.sdrManagerQuantity > 0 && (
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">SDR Manager Seats</p>
              <p className="text-sm text-muted-foreground text-gray-500">
                {formValues.sdrManagerQuantity} × ${PRICES.SDR_MANAGER}/mo
              </p>
            </div>
            <p className="font-medium">
              ${formValues.sdrManagerQuantity * PRICES.SDR_MANAGER}/mo
            </p>
          </div>
        )}

        {formValues.sdrQuantity > 0 && (
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">SDR Seats</p>
              <p className="text-sm text-gray-500">
                {formValues.sdrQuantity} × ${PRICES.SDR}/mo
              </p>
            </div>
            <p className="font-medium ">
              ${formValues.sdrQuantity * PRICES.SDR}/mo
            </p>
          </div>
        )}

        {formValues.sdrDataPackage && (
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Data Package</p>
              <p className="text-sm text-gray-500">
                {formValues.sdrDataPackage === "299"
                  ? "$299 Data Package"
                  : "$499 Data Package"}
              </p>
            </div>
            <p className="font-medium">
              {/* 299 is free */}
              {formValues.sdrDataPackage === "299"
                ? "$0/mo"
                : `$${PRICES.DATA_PACKAGE[formValues.sdrDataPackage]}/mo`}
            </p>
          </div>
        )}

        <Separator />

        <div className="flex justify-between items-center pt-2">
          <div>
            <p className="text-lg font-semibold">Total</p>
            <p className="text-sm text-muted-foreground">Billed monthly</p>
          </div>
          <p className="text-2xl font-bold">${amount}/mo</p>
        </div>
      </div>

      {/* Total Amount and Submit Button */}
      <div className="w-full flex justify-end pt-4">
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          Proceed to Payment
        </Button>
      </div>
    </form>
  );
};

ClientSubscriptionCreateForm.displayName = "ClientSubscriptionCreateForm";

export default ClientSubscriptionCreateForm;
