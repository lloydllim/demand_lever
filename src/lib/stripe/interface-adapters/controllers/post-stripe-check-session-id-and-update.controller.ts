import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeCheckSessionIdAndUpdateUseCase } from "@/lib/stripe/application/use-case/stripe-check-session-id-and-update.use-case";
import { z } from "zod";

const presenter = (
  instrumentationService: IInstrumentationService,
  success: boolean
) => {
  return instrumentationService.startSpan({ name: "presenter" }, () => {
    return success;
  });
};

const inputData = z.object({
  sessionId: z.string(),
  token: z.string(),
});

export type IPostStripeCheckSessionIdAndUpdateController = ReturnType<
  typeof postStripeCheckSessionIdAndUpdateController
>;

export const postStripeCheckSessionIdAndUpdateController =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthService,
    stripeCheckSessionIdAndUpdateUseCase: IStripeCheckSessionIdAndUpdateUseCase
  ) =>
  async (input: z.infer<typeof inputData>) => {
    return instrumentationService.startSpan(
      { name: "postStripeCheckSessionIdAndUpdateController" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);

        if (inputParseError) {
          throw new Error("Invalid input", { cause: inputParseError });
        }

        const currentUser = authService.verifyToken(data.token);

        if (!currentUser) {
          throw new UnauthenticatedError("User is not authenticated");
        }

        const success = await stripeCheckSessionIdAndUpdateUseCase(
          currentUser.user_id,
          data.sessionId
        );
        return presenter(instrumentationService, success);
      }
    );
  };
