import { DI_SYMBOLS } from "@/di/types";
import { stripeCreateCheckoutSessionIdAsClientUseCase } from "@/lib/stripe/application/use-case/stripe-create-checkout-session-id-as-client.use-case";
import { stripeProcessWebhookUseCase } from "@/lib/stripe/application/use-case/stripe-process-webhook.use-case";
import { StripeService } from "@/lib/stripe/infrastructure/services/stripe.service";
import { postStripeCreateCheckoutSessionIdAsClientController } from "@/lib/stripe/interface-adapters/controllers/post-stripe-create-checkout-session-id-as-client.controller";
import { postStripeProcessWebhookController } from "@/lib/stripe/interface-adapters/controllers/post-stripe-process-webhook.controller";
import { createModule } from "@evyweb/ioctopus";

export const createStripeModule = () => {
  const stripeModule = createModule();

  stripeModule
    .bind(DI_SYMBOLS.IStripeService)
    .toClass(StripeService, [DI_SYMBOLS.IInstrumentationService]);

  stripeModule
    .bind(DI_SYMBOLS.IStripeCreateCheckoutSessionIdAsClientUseCase)
    .toHigherOrderFunction(stripeCreateCheckoutSessionIdAsClientUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IStripeService,
      DI_SYMBOLS.IUserRepository,
    ]);

  stripeModule
    .bind(DI_SYMBOLS.IPostStripeCreateCheckoutSessionIdAsClientController)
    .toHigherOrderFunction(
      postStripeCreateCheckoutSessionIdAsClientController,
      [
        DI_SYMBOLS.IInstrumentationService,
        DI_SYMBOLS.IAuthService,
        DI_SYMBOLS.IStripeCreateCheckoutSessionIdAsClientUseCase,
      ]
    );

  stripeModule
    .bind(DI_SYMBOLS.IStripeProcessWebhookUseCase)
    .toHigherOrderFunction(stripeProcessWebhookUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IStripeService,
      DI_SYMBOLS.IUserRepository,
    ]);

  stripeModule
    .bind(DI_SYMBOLS.IPostStripeProcessWebhookController)
    .toHigherOrderFunction(postStripeProcessWebhookController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IStripeProcessWebhookUseCase,
    ]);

  return stripeModule;
};
