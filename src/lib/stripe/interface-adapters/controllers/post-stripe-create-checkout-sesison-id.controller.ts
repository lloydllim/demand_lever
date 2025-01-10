import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeCreateCheckoutSessionIdUseCase } from "@/lib/stripe/application/use-case/stripe-create-checkout-session-id.use-case";
import { z } from "zod";

const presenter = (
  instrumentationService: IInstrumentationService,
  sessionId: string
) => {
  return instrumentationService.startSpan({ name: "presenter" }, () => {
    return sessionId;
  });
};

const inputData = z.object({
  sdrManagerQuantity: z.number().int().max(1),
  sdrQuantity: z.number().int(),
  sdrDataPackage: z.enum(["299", "499"]),
  payrollFeeAmount: z.number().int(),
  userId: z.string(),
});

export type IPostStripeCreateCheckoutSessionIdController = ReturnType<
  typeof postStripeCreateCheckoutSessionIdController
>;

export const postStripeCreateCheckoutSessionIdController =
  (
    instrumentationService: IInstrumentationService,
    StripeCreateCheckoutSessionIdUseCase: IStripeCreateCheckoutSessionIdUseCase
  ) =>
  async (input: z.infer<typeof inputData>) => {
    return instrumentationService.startSpan(
      { name: "postStripeCreateCheckoutSessionIdController" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);
        if (inputParseError) {
          throw new InputParseError("Invalid input", {
            cause: inputParseError,
          });
        }

        const sessionId = await StripeCreateCheckoutSessionIdUseCase(
          data.sdrManagerQuantity,
          data.sdrQuantity,
          data.sdrDataPackage,
          data.payrollFeeAmount,
          "http://localhost:3000",
          "http://localhost:3000",
          data.userId
        );
        return presenter(instrumentationService, sessionId);
      }
    );
  };
