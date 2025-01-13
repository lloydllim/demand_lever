import { z } from "zod";

export const CreateCheckoutSessiosIdAsClientInput = z.object({
  sdrManagerQuantity: z.number().int().max(1),
  sdrQuantity: z.number().int(),
  sdrDataPackage: z.enum(["299", "499"]),
  payrollFeeAmount: z.number().int(),
});

export type ICreateCheckoutSessiosIdAsClientInput = z.infer<
  typeof CreateCheckoutSessiosIdAsClientInput
>;
