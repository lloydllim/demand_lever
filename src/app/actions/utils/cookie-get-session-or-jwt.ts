import { cookies } from "next/headers";

export const cookieGetSessionOrJwt = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const sessionOrJwt =
    cookieStore.get("session") || cookieStore.get("_vercel_jwt");

  return sessionOrJwt?.value;
};
