import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeService } from "@/lib/stripe/application/services/stripe.service.interface";

export type IStripeCreateCheckoutSessionIdAsClientUseCase = ReturnType<
  typeof stripeCreateCheckoutSessionIdAsClientUseCase
>;
export const stripeCreateCheckoutSessionIdAsClientUseCase =
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
      { name: "stripeCreateCheckoutSessionIdAsClientUseCase" },
      () => {
        return stripeService.createCheckoutSessionIdAsClient(
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
