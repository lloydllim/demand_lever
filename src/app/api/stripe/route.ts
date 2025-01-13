import { getInjection } from "@/di/container";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const instrumentationService = getInjection("IInstrumentationService");
  return instrumentationService.startSpan(
    { name: "POST /api/stripe/process-webhook" },
    async () => {
      try {
        const body = await request.text();
        const sig = request.headers.get("Stripe-Signature");

        if (!sig) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const postStripeProcessWebhookController = getInjection(
          "IPostStripeProcessWebhookController"
        );

        const result = await postStripeProcessWebhookController({
          body,
          signature: sig,
        });

        return NextResponse.json({
          succeed: result,
        });
      } catch (error) {
        if (error instanceof InputParseError) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);

        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
  );
};
