"use server";

import { authVerifyTokenAction } from "@/app/actions/auth/auth-verify-token.action";
import { IToken } from "@/app/actions/auth/utils/token.type";
import { getInjection } from "@/di/container";
import { z } from "zod";

const inputData = z.object({
  sdrManagerQuantity: z.number().int().max(1),
  sdrQuantity: z.number().int(),
  sdrDataPackage: z.enum(["299", "499"]),
  payrollFeeAmount: z.number().int(),
});

export const stripeCreateCheckoutSessionIdAction = async (
  input: z.infer<typeof inputData>
) => {
  console.log(input);
  const token = (await authVerifyTokenAction()) as IToken;

  const instrumentationService = getInjection("IInstrumentationService");
  return await instrumentationService.instrumentServerAction(
    "stripeCreateCheckoutSessionIdAction",
    { recordResponse: true },
    async () => {
      const postStripeCreateCheckoutSessionIdController = getInjection(
        "IPostStripeCreateCheckoutSessionIdController"
      );
      return await postStripeCreateCheckoutSessionIdController({
        ...input,
        userId: token.user_id,
      });
    }
  );
};
