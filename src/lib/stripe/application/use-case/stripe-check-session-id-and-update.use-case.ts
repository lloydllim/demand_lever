import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeService } from "@/lib/stripe/application/services/stripe.service.interface";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";

export type IStripeCheckSessionIdAndUpdateUseCase = ReturnType<
  typeof stripeCheckSessionIdAndUpdateUseCase
>;

export const stripeCheckSessionIdAndUpdateUseCase =
  (
    instrumentationService: IInstrumentationService,
    stripeService: IStripeService,
    userRepository: IUserRepository
  ) =>
  async (userId: string, sessionId: string) => {
    return instrumentationService.startSpan(
      { name: "stripeCheckSessionIdAndUpdateUseCase" },
      async () => {
        const stripeClient = stripeService.getClient();
        const session = await stripeClient.checkout.sessions.retrieve(
          sessionId
        );

        if (session.payment_status === "paid") {
          await userRepository.updateById(userId, {
            stripeSubscriptionId: session.subscription as string,
            stripeCustomerId: session.customer as string,
          });
          return true;
        }
        return false;
      }
    );
  };
