import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeProcessWebhookUseCase } from "@/lib/stripe/application/use-case/stripe-process-webhook.use-case";
import { z } from "zod";

const presenter = (
  instrumentationService: IInstrumentationService,
  succeed: boolean
) => {
  return instrumentationService.startSpan({ name: "presenter" }, () => {
    return succeed;
  });
};

const inputData = z.object({
  body: z.string(),
  signature: z.string(),
});

export type IPostStripeProcessWebhookController = ReturnType<
  typeof postStripeProcessWebhookController
>;

export const postStripeProcessWebhookController =
  (
    instrumentationSevice: IInstrumentationService,
    stripeProcessWebhook: IStripeProcessWebhookUseCase
  ) =>
  async (input: z.infer<typeof inputData>) => {
    return instrumentationSevice.startSpan(
      { name: "postStripeProcessWebhookController" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);
        if (inputParseError) {
          throw new InputParseError("Invalid input", {
            cause: inputParseError,
          });
        }

        const succeed = await stripeProcessWebhook(data.body, data.signature);
        return presenter(instrumentationSevice, succeed);
      }
    );
  };
