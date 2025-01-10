import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  JWT_TOKEN: z.string(),
  AUTH_TOKEN: z.string(),
  NODE_ENV: z.string(),
});

const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export type IEnv = z.infer<typeof envSchema>;
export default env;
