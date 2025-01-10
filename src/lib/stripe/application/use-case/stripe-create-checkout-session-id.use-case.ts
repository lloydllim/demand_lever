import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeService } from "@/lib/stripe/application/services/stripe.service.interface";

export type IStripeCreateCheckoutSessionIdUseCase = ReturnType<
  typeof stripeCreateCheckoutSessionIdUseCase
>;
export const stripeCreateCheckoutSessionIdUseCase =
  (
    instrumentationService: IInstrumentationService,
    stripeService: IStripeService
  ) =>
  async (
    sdrManagerQuantity: number,
    sdrQuantity: number,
    sdrDataPackage: "299" | "499",
    payrollFeeAmount: number,
    successUrl: string,
    cancelUrl: string,
    userId: string
  ) => {
    return instrumentationService.startSpan(
      { name: "stripeCreateCheckoutSessionIdUseCase" },
      () => {
        return stripeService.createCheckoutSessionId(
          sdrManagerQuantity,
          sdrQuantity,
          sdrDataPackage,
          payrollFeeAmount,
          successUrl,
          cancelUrl,
          userId
        );
      }
    );
  };
