export interface IStripeService {
  createCheckoutSessionId(
    sdrManagerQuantity: number,
    sdrQuantity: number,
    sdrDataPackage: "299" | "499",
    payrollFeeAmount: number,
    successUrl: string,
    cancelUrl: string,
    userId: string
  ): Promise<string>;
}
