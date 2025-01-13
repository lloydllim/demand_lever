"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from "@/components/ui/steps";
import { toaster } from "@/components/ui/toaster";
import { Input, createListCollection } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const referralForList = createListCollection({
  items: [
    { label: "$299 confirmed meeting", value: "299" },
    { label: "$499 confirmed meeting", value: "499" },
  ],
});

const formSchema = z.object({
  phoneNumber: z.string(),
  linkedinUrl: z.string().url(),
  companyName: z.string(),
  companyWebsite: z.string().url(),
  referralFor: z.enum(["299", "499"]),

  aggrementAccepted: z.boolean(),
  expectationAccepted: z.boolean(),
  termsAndPrivacyAccepted: z.boolean(),
});

const ClientOnboardingForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      linkedinUrl: "",
      companyName: "",
      companyWebsite: "",
      referralFor: undefined,
      aggrementAccepted: false,
      expectationAccepted: false,
      termsAndPrivacyAccepted: false,
    },
  });

  const handleSubmit = async (input: z.infer<typeof formSchema>) => {
    try {
      // todo fix dirty redirect and manual user type assignment
      toaster.create({
        title: "Not implemented",
        description: "This feature is not implemented yet.",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Something went wrong",
        description: "The team has been notified. Please try again later.",
        type: "error",
      });
    }
  };

  const {
    formState: { errors },
    formState: { isValid },
    formState: { isSubmitting },
    trigger,
  } = form;

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = [];
    switch (currentStep) {
      case 0:
        fieldsToValidate = ["phoneNumber", "linkedinUrl"];
        break;
      case 1:
        fieldsToValidate = ["companyName", "companyWebsite"];
        break;
      case 2:
        fieldsToValidate = [
          "aggrementAccepted",
          "expectationAccepted",
          "termsAndPrivacyAccepted",
        ];
        break;
      default:
        break;
    }
    return await trigger(fieldsToValidate);
  };

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep();
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-4 "
    >
      <StepsRoot
        linear={true}
        className="flex justify-between"
        count={4}
        step={currentStep}
      >
        <StepsList>
          <StepsItem
            index={0}
            title="Profile"
          />
          <StepsItem
            index={1}
            title="Company"
          />
          <StepsItem
            index={2}
            title="Agreement"
          />
        </StepsList>

        <StepsContent
          index={0}
          className="space-y-4"
        >
          <Field
            label="Phone Number"
            invalid={errors.phoneNumber?.message !== undefined}
            errorText={errors.phoneNumber?.message}
          >
            <Input
              placeholder="Phone Number"
              {...form.register("phoneNumber")}
            />
          </Field>
          <Field
            label="Linkedin Profile"
            invalid={errors.linkedinUrl?.message !== undefined}
            errorText={errors.linkedinUrl?.message}
          >
            <Input
              placeholder="Linkedin Profile"
              {...form.register("linkedinUrl")}
            />
          </Field>
        </StepsContent>
        <StepsContent
          index={1}
          className="space-y-4"
        >
          <Field
            label="Company Name"
            invalid={errors.companyName?.message !== undefined}
            errorText={errors.companyName?.message}
          >
            <Input
              placeholder="Company Name"
              {...form.register("companyName")}
            />
          </Field>
          <Field
            label="Company Website"
            invalid={errors.companyWebsite?.message !== undefined}
            errorText={errors.companyWebsite?.message}
          >
            <Input
              placeholder="Company Website"
              {...form.register("companyWebsite")}
            />
          </Field>
        </StepsContent>
        <StepsContent
          index={2}
          className="space-y-4"
        >
          <p className="text-sm text-gray-600">
            PipeLinear offers incentives like Amazon eGift cards to prospects
            to have a 30 minute interview about services company goals and
            purchasing processes.
          </p>
          <p className="text-sm text-gray-600">
            This information is maintained in a database until we find a vendor
            that closely fits what our prospect is looking for, prospects may
            be incentivized again for a meeting or other action.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              Pipelinear operates a sales team that primarily prospects cold
              outreach sales channels.
            </li>

            <li>
              We book sales meetings with target market prospects that are
              buying what our client's offer.
            </li>

            <li>
              We ask prospects to have deep-dive 30-min interview with us in
              exchange for an incentive to learn ongoing initiatives.
            </li>
          </ul>

          <p className="text-sm text-gray-600">
            Read our{" "}
            <Link
              href="/terms"
              className="underline"
            >
              terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline"
            >
              privacy
            </Link>{" "}
            policies.
          </p>

          <Controller
            control={form.control}
            name="aggrementAccepted"
            render={({ field }) => (
              <Field
                disabled={field.disabled}
                invalid={errors.aggrementAccepted?.message !== undefined}
                errorText={errors.aggrementAccepted?.message}
              >
                <Checkbox
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  I agree and understand the agreement.
                </Checkbox>
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="expectationAccepted"
            render={({ field }) => (
              <Field
                disabled={field.disabled}
                invalid={errors.expectationAccepted?.message !== undefined}
                errorText={errors.expectationAccepted?.message}
              >
                <Checkbox
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  I agree and understand the expectation.
                </Checkbox>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="termsAndPrivacyAccepted"
            render={({ field }) => (
              <Field
                disabled={field.disabled}
                invalid={errors.termsAndPrivacyAccepted?.message !== undefined}
                errorText={errors.termsAndPrivacyAccepted?.message}
              >
                <Checkbox
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  I agree to the terms and privacy policies.
                </Checkbox>
              </Field>
            )}
          />
        </StepsContent>

        <StepsCompletedContent>
          <Button
            variant={"surface"}
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full"
          >
            Submit
          </Button>
        </StepsCompletedContent>

        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Prev
          </Button>
          <Button
            size="sm"
            onClick={handleNext}
            disabled={isSubmitting}
          >
            Next
          </Button>
        </div>
      </StepsRoot>
    </form>
  );
};

ClientOnboardingForm.displayName = "ClientOnboardingForm";

export default ClientOnboardingForm;
