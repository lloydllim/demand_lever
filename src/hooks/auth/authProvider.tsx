"use client";

import { postAuthVerifyTokenAction } from "@/app/actions/auth/post-auth-verify-token.action";
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
  user: null;
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
      const result = await postAuthVerifyTokenAction();

      if (result.error) {
        routerPush("/login");
        return;
      }

      const response = result.data;
      const loginPathNameRegex = new RegExp(`^/login(/.*)?$`);
      const signupPathNameRegex = new RegExp(`^/signup(/.*)?$`);
      const authPathnameRegex = new RegExp(`^/auth(/.*)?$`);
      const clientsPathNameRegex = new RegExp(`^/clients(/.*)?$`);

      const shouldRedirect = (pathname: string) => {
        const strippedPathname = pathname.split("?")[0];

        return (
          loginPathNameRegex.test(strippedPathname) ||
          signupPathNameRegex.test(strippedPathname) ||
          authPathnameRegex.test(strippedPathname) ||
          clientsPathNameRegex.test(strippedPathname)
        );
      };

      // If the user is not logged in and the path is not /login/*, redirect to /login
      if (!response && !shouldRedirect(pathName)) {
        routerPush("/login");
      } else {
        // If the user is logged in and the path is /login/*, redirect to appropriate page
        const data = response as IJwtPayload;

        if (
          data.user_type === "clients" &&
          !clientsPathNameRegex.test(pathName.split("?")[0])
        ) {
          console.log(pathName);
          routerPush("/clients");
        }
      }
    } catch (error) {
      console.error(error);
      routerPush("/login");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    authVerifyToken();
  }, [authVerifyToken]);

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
