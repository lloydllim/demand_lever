import { authVerifyTokenAction } from "@/app/actions/auth/auth-verify-token.action";
import { IToken } from "@/app/actions/auth/utils/token.type";
import { userFindByIdAsClientAction } from "@/app/actions/user/user-find-by-id-as-client.action";
import { redirect } from "next/navigation";

export type IClientServerPage = {};

const ClientServerPage: React.FC<IClientServerPage> = async () => {
  let redirectTo;

  try {
    const token = (await authVerifyTokenAction()) as IToken;
    const user = await userFindByIdAsClientAction(token.user_id);

    if (!user.hasCompletedOnboarding) {
      redirectTo = "/clients/onboarding";
    }

    return <div>Client page</div>;
  } catch (error) {
    redirectTo = "/client/auth/signin";
  } finally {
    if (redirectTo) {
      redirect(redirectTo);
    }
  }
};

ClientServerPage.displayName = "ClientServerPage";

export default ClientServerPage;
