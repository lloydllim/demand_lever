import { DI_SYMBOLS } from "@/di/types";
import { stripeCreateCheckoutSessionIdUseCase } from "@/lib/stripe/application/use-case/stripe-create-checkout-session-id.use-case";
import { StripeService } from "@/lib/stripe/infrastructure/services/stripe.service";
import { postStripeCreateCheckoutSessionIdController } from "@/lib/stripe/interface-adapters/controllers/post-stripe-create-checkout-sesison-id.controller";
import { createModule } from "@evyweb/ioctopus";

export const createStripeModule = () => {
  const stripeModule = createModule();

  stripeModule
    .bind(DI_SYMBOLS.IStripeService)
    .toClass(StripeService, [DI_SYMBOLS.IInstrumentationService]);

  stripeModule
    .bind(DI_SYMBOLS.IStripeCreateCheckoutSessionIdUseCase)
    .toHigherOrderFunction(stripeCreateCheckoutSessionIdUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IStripeService,
    ]);

  stripeModule
    .bind(DI_SYMBOLS.IPostStripeCreateCheckoutSessionIdController)
    .toHigherOrderFunction(postStripeCreateCheckoutSessionIdController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IStripeCreateCheckoutSessionIdUseCase,
    ]);

  return stripeModule;
};
