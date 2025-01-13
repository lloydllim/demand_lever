import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeCreateCheckoutSessionIdAsClientUseCase } from "@/lib/stripe/application/use-case/stripe-create-checkout-session-id-as-client.use-case";
import { CreateCheckoutSessiosIdAsClientInput } from "@/lib/stripe/entities/stripe-client.types";
import { z } from "zod";

const presenter = (
  instrumentationService: IInstrumentationService,
  sessionId: string
) => {
  return instrumentationService.startSpan({ name: "presenter" }, () => {
    return sessionId;
  });
};

const inputData = CreateCheckoutSessiosIdAsClientInput.extend({
  token: z.string(),
});

export type IPostStripeCreateCheckoutSessionIdAsClientController = ReturnType<
  typeof postStripeCreateCheckoutSessionIdAsClientController
>;

export const postStripeCreateCheckoutSessionIdAsClientController =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthService,
    stripeCreateCheckoutSessionIdAsClient: IStripeCreateCheckoutSessionIdAsClientUseCase
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

        const currentUser = authService.verifyToken(data.token);

        if (!currentUser) {
          throw new UnauthenticatedError("User not signed in.");
        }

        const sessionId = await stripeCreateCheckoutSessionIdAsClient(
          data.sdrManagerQuantity,
          data.sdrQuantity,
          data.sdrDataPackage,
          data.payrollFeeAmount,
          "http://localhost:3000",
          "http://localhost:3000",
          currentUser.user_id
        );
        return presenter(instrumentationService, sessionId);
      }
    );
  };
