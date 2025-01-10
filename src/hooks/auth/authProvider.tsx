"use client";

import { authVerifyTokenAction } from "@/app/actions/auth-verify-token.action";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

type IJwtPayload = {
  user_name: string;
  user_email: string;
  user_type: string;
  iat: number;
  exp: number;
};

export type IAuthContextType = {
  children?: React.ReactNode;
  user: any;
};

const AuthContext = createContext<IAuthContextType>({
  user: null,
});

const AuthProvider: React.FC<IAuthContextType> = (props: IAuthContextType) => {
  const router = useRouter();
  const pathName = usePathname();
  const [navigating, setIsNavigating] = useTransition();
  const [loading, setLoading] = useState<boolean>(true);

  const routerPush = (route: string) => {
    setIsNavigating(() => {
      router.push(route);
    });
  };

  const authVerifyToken = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authVerifyTokenAction();
      const loginPathNameRegex = new RegExp(`^/login(/.*)?$`);
      const signupPathNameRegex = new RegExp(`^/signup(/.*)?$`);
      const authPathnameRegex = new RegExp(`^/auth(/.*)?$`);

      // If the user is not logged in and the path is not /login/*, redirect to /login
      if (
        !response &&
        !loginPathNameRegex.test(pathName) &&
        !signupPathNameRegex.test(pathName) &&
        !authPathnameRegex.test(pathName)
      ) {
        routerPush("/login");
      } else {
        // If the user is logged in and the path is /login/*, redirect to appropriate page
        const data = response as IJwtPayload;

        if (data.user_type === "clients") {
          routerPush("/clients");
        }
      }
    } catch (error) {
      routerPush("/login");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    authVerifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ children: props.children, user: props.user }}
    >
      {navigating || loading ? <div>Loading...</div> : props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.displayName = "AuthProvider";

export default AuthProvider;
