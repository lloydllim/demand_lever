import { UnauthorizedError } from "@/lib/auth/entities/auth.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeService } from "@/lib/stripe/application/services/stripe.service.interface";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";

export type IStripeProcessWebhookUseCase = ReturnType<
  typeof stripeProcessWebhookUseCase
>;

export const stripeProcessWebhookUseCase =
  (
    instrumentationService: IInstrumentationService,
    stripeService: IStripeService,
    userRepository: IUserRepository
  ) =>
  async (body: string, signature: string) => {
    return await instrumentationService.startSpan(
      { name: "stripeProcessWebhookUseCase" },
      async () => {
        const event = await stripeService.constructEvent(body, signature);

        switch (event.type) {
          case "customer.subscription.created":
            // Handle customer.subscription.created event
            const subscription = event.data.object;

            const subscriptionUser = await userRepository.findById(
              subscription.metadata.user_id as string
            );

            if (!subscriptionUser) {
              throw new UnauthorizedError("User not found.");
            }

            await userRepository.updateById(subscriptionUser.id, {
              stripeCustomerId: subscription.customer as string,
            });

            return true;
            break;
          // payments
          case "invoice.payment_succeeded":
            // Handle invoice.payment_succeeded event
            const invoice = event.data.object;

            const invoiceUser = await userRepository.findByStripeCustomerId(
              invoice.customer as string
            );

            if (!invoiceUser) {
              throw new UnauthorizedError("User not found.");
            }

            await userRepository.updateById(invoiceUser.id, {
              stripeSubscriptionId: invoice.subscription as string,
            });

            return true;
            break;
          default:
            return false;
        }
      }
    );
  };
