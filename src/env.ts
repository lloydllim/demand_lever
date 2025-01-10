import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  JWT_TOKEN: z.string(),
  AUTH_TOKEN: z.string(),
  NODE_ENV: z.string(),

  STRIPE_SECRET_KEY: z.string(),
  STRIPE_SDR_PRODUCT_ID: z.string(),
  STRIPE_SDR_PRICE_ID: z.string(),
  STRIPE_SDR_MANAGER_PRODUCT_ID: z.string(),
  STRIPE_SDR_MANAGER_PRICE_ID: z.string(),
  STRIPE_DATA_PACKAGE_PRODUCT_ID: z.string(),
  STRIPE_DATA_PACKAGE_PRICE_1_ID: z.string(),
  STRIPE_DATA_PACKAGE_PRICE_2_ID: z.string(),
});

const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export type IEnv = z.infer<typeof envSchema>;
export default env;
