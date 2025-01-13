import env from "@/env";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IStripeService } from "@/lib/stripe/application/services/stripe.service.interface";
import Stripe from "stripe";

export const StripeService = class implements IStripeService {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly stripeClient: Stripe = new Stripe(env.STRIPE_SECRET_KEY)
  ) {}

  async createCheckoutSessionIdAsClient(
    sdrManagerQuantity: number,
    sdrQuantity: number,
    sdrDataPackage: "299" | "499",
    payrollFeeAmount: number,
    successUrl: string,
    cancelUrl: string,
    userId: string
  ): Promise<string> {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (sdrManagerQuantity > 0) {
      line_items.push({
        price: env.STRIPE_SDR_MANAGER_PRICE_ID,
        quantity: sdrManagerQuantity,
      });
    }

    if (sdrQuantity > 0) {
      line_items.push({
        price: env.STRIPE_SDR_PRICE_ID,
        quantity: sdrQuantity,
      });
    }

    line_items.push({
      price:
        sdrDataPackage === "499"
          ? env.STRIPE_DATA_PACKAGE_PRICE_1_ID
          : env.STRIPE_DATA_PACKAGE_PRICE_2_ID,
      quantity: 1,
    });

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Payroll Fee",
        },
        unit_amount: payrollFeeAmount * 100,
      },
      quantity: 1,
    });

    return this.instrumentationService.startSpan(
      { name: "StripeService.createCheckoutSessionId" },
      async () => {
        const session = await this.stripeClient.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: line_items,
          mode: "subscription",
          success_url: successUrl,
          cancel_url: cancelUrl,
          subscription_data: {
            metadata: {
              user_id: userId,
            },
          },
        });

        return session.id;
      }
    );
  }

  constructEvent(body: string, signature: string): Promise<Stripe.Event> {
    return this.instrumentationService.startSpan(
      { name: "StripeService.constructEvent" },
      async () => {
        return this.stripeClient.webhooks.constructEvent(
          body,
          signature,
          env.STRIPE_WEBHOOK_SECRET
        );
      }
    );
  }
};
