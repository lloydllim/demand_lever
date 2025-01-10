"use client";

import { authVerifyTokenAction } from "@/app/actions/auth-verify-token.action";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useEffect } from "react";

export type IAuthContextType = {
  children?: React.ReactNode;
  user: any;
};

const AuthContext = createContext<IAuthContextType>({
  user: null,
});

const AuthProvider: React.FC<IAuthContextType> = (props: IAuthContextType) => {
  const pathName = usePathname();
  const router = useRouter();

  const authVerifyToken = useCallback(async () => {
    try {
      const response = await authVerifyTokenAction();

      const loginPathNameRegex = new RegExp(`^/login(/.*)?$`);
      const signupPathNameRegex = new RegExp(`^/signup(/.*)?$`);

      // If the user is not logged in and the path is not /login/*, redirect to /login
      if (
        !response &&
        !loginPathNameRegex.test(pathName) &&
        !signupPathNameRegex.test(pathName)
      ) {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    authVerifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ children: props.children, user: props.user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.displayName = "AuthProvider";

export default AuthProvider;
