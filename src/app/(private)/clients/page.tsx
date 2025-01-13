import { ReadUserByIdAsClientAction } from "@/app/actions/user/read-user-by-id-as-client.action";
import { Card } from "@chakra-ui/react";
import { redirect } from "next/navigation";

const ClientServerPage: React.FC = async () => {
  const responseUser = await ReadUserByIdAsClientAction();

  if (responseUser.error) {
    return (
      <Card.Root>
        <Card.Header>
          <Card.Title>Something went wrong</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>{responseUser.error}</p>
        </Card.Body>
      </Card.Root>
    );
  }

  if (responseUser.result) {
    const user = responseUser.result;

    if (!user.hasCompletedOnboarding) {
      redirect("/clients/onboarding");
    }

    if (!user.stripeCustomerId) {
      redirect("/clients/plans");
    }

    return (
      <Card.Root>
        <Card.Header>
          <Card.Title>Your profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>{responseUser.result.email}</p>
        </Card.Body>
      </Card.Root>
    );
  }
};

ClientServerPage.displayName = "ClientServerPage";

export default ClientServerPage;
