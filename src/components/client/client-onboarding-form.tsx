"use client";

import { updateUserByIdAsClientAction } from "@/app/actions/user/client/update-user-by-id-as-client.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from "@/components/ui/steps";
import { toaster } from "@/components/ui/toaster";
import {
  IUpdateUserClient,
  UpdateUserClient,
} from "@/lib/user/entities/user.model";
import { createListCollection, Input, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const companySize = createListCollection({
  items: [
    { label: "1-10", value: "1-10" },
    { label: "11-20", value: "11-20" },
    { label: "21-50", value: "21-50" },
    { label: "51-100", value: "51-100" },
    { label: "101+", value: "101+" },
  ],
});

const ClientOnboardingForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<IUpdateUserClient>({
    resolver: zodResolver(UpdateUserClient),
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      linkedinUrl: "",
      companyName: "",
      companyWebsite: "",
      agreementAccepted: false,
      expectationAccepted: false,
      termsAndPrivacyAccepted: false,
      marketingCalendlyLink: "",
      marketingCompanySize: null,
      marketingIndustry: "",
      marketingPreferences: "",
      marketingPrefferedJobTitle: "",
      marketingValueProposition: "",
    },
  });

  const handleSubmit = async (input: IUpdateUserClient) => {
    const result = await updateUserByIdAsClientAction(input);

    if (result.error) {
      toaster.create({
        title: "Something went wrong",
        description: result.error,
        type: "error",
      });
    } else if (result.data) {
      toaster.create({
        title: "Success",
        description: "Your profile has been updated.",
        type: "success",
      });
      router.push("/clients/plans");
    }
  };

  const {
    formState: { errors },
    formState: { isValid },
    formState: { isSubmitting },
    trigger,
  } = form;

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof IUpdateUserClient)[] = [];
    console.log(currentStep);
    switch (currentStep) {
      case 0:
        fieldsToValidate = ["phoneNumber", "linkedinUrl"];
        break;
      case 1:
        fieldsToValidate = ["companyName", "companyWebsite"];
        break;
      case 2:
        fieldsToValidate = [
          "marketingValueProposition",
          "marketingIndustry",
          "marketingCompanySize",
          "marketingPrefferedJobTitle",
          "marketingCalendlyLink",
          "marketingPreferences",
        ];
        break;

      case 3:
        fieldsToValidate = [
          "agreementAccepted",
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

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
            title="Marketing"
          />

          <StepsItem
            index={3}
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
          <Field
            label="Value Proposition"
            invalid={errors.marketingValueProposition?.message !== undefined}
            errorText={errors.marketingValueProposition?.message}
          >
            <Textarea
              placeholder="What is your most compelling value proposition?"
              {...form.register("marketingValueProposition")}
            />
          </Field>
          <Field
            label="Target Industry"
            invalid={errors.marketingIndustry?.message !== undefined}
            errorText={errors.marketingIndustry?.message}
          >
            <Textarea
              placeholder={
                "What is the industry that you target? Is it a hard requirement?"
              }
              {...form.register("marketingIndustry")}
            />
          </Field>

          <Field
            label="What is your ideal target's company headcount?"
            invalid={!!errors.marketingCompanySize}
            errorText={errors.marketingCompanySize?.message}
            width="320px"
          >
            <Controller
              control={form.control}
              name="marketingCompanySize"
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value ? [field.value] : undefined}
                  onValueChange={({ value }) => field.onChange(value[0])}
                  onInteractOutside={() => field.onBlur()}
                  collection={companySize}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySize.items.map((company) => (
                      <SelectItem
                        item={company}
                        key={company.value}
                      >
                        {company.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>

          <Field
            label="Job Title"
            invalid={errors.marketingPrefferedJobTitle?.message !== undefined}
            errorText={errors.marketingPrefferedJobTitle?.message}
          >
            <Input
              placeholder="What are the job titles that our team should focus on?"
              {...form.register("marketingPrefferedJobTitle")}
            />
          </Field>
          <Field
            label="What is the best Calendly link that we can use for this campaign?"
            invalid={errors.marketingCalendlyLink?.message !== undefined}
            errorText={errors.marketingCalendlyLink?.message}
          >
            <Input
              placeholder="Calendly Link"
              {...form.register("marketingCalendlyLink")}
            />
          </Field>
          <Field
            label="Preferences"
            invalid={errors.marketingPreferences?.message !== undefined}
            errorText={errors.marketingPreferences?.message}
          >
            <Textarea
              placeholder="What are your preferences for this campaign?"
              {...form.register("marketingPreferences")}
            />
          </Field>
        </StepsContent>
        <StepsContent
          index={3}
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
              buying what our client&apos;s offer.
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
            name="agreementAccepted"
            render={({ field }) => (
              <Field
                disabled={field.disabled}
                invalid={errors.agreementAccepted?.message !== undefined}
                errorText={errors.agreementAccepted?.message}
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
            disabled={isSubmitting || currentStep === 4}
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
