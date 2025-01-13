import { UnauthorizedError } from "@/lib/auth/entities/auth.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeService } from "@/lib/stripe/application/services/stripe.service.interface";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";

export type IStripeCreateCheckoutSessionIdAsClientUseCase = ReturnType<
  typeof stripeCreateCheckoutSessionIdAsClientUseCase
>;
export const stripeCreateCheckoutSessionIdAsClientUseCase =
  (
    instrumentationService: IInstrumentationService,
    stripeService: IStripeService,
    userRepository: IUserRepository
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
      async () => {
        const user = await userRepository.findById(userId);

        if (!user) {
          throw new UnauthorizedError("User not found.");
        }

        let customerId: string | undefined = undefined;

        if (user.stripeCustomerId) {
          customerId = user.stripeCustomerId;
        }

        return stripeService.createCheckoutSessionIdAsClient(
          sdrManagerQuantity,
          sdrQuantity,
          sdrDataPackage,
          payrollFeeAmount,
          successUrl,
          cancelUrl,
          userId,
          customerId
        );
      }
    );
  };
