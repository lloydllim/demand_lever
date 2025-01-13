import Stripe from "stripe";

export interface IStripeService {
  createCheckoutSessionIdAsClient(
    sdrManagerQuantity: number,
    sdrQuantity: number,
    sdrDataPackage: "299" | "499",
    payrollFeeAmount: number,
    successUrl: string,
    cancelUrl: string,
    userId: string
  ): Promise<string>;

  constructEvent(body: string, signature: string): Promise<Stripe.Event>;
}
