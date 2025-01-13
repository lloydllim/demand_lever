import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { cookies } from "next/headers";

export const cookieGetSessionOrJwt = async (): Promise<string> => {
  const cookieStore = await cookies();
  const sessionOrJwt =
    cookieStore.get("session") || cookieStore.get("_vercel_jwt");

  if (sessionOrJwt?.value) {
    return sessionOrJwt.value;
  } else {
    throw new UnauthenticatedError("Unauthenticated not signed in.");
  }
};
