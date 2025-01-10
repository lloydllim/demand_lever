import ClientSigninForm from "@/components/client/client-signin-form";
import { Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";

export interface IAuthClientSigninPage {}

const AuthClientSigninPage: React.FC<IAuthClientSigninPage> = () => {
  return (
    <Grid height="100vh">
      <GridItem>
        <Flex
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Card.Root
            width="320px"
            variant={"elevated"}
          >
            <Card.Body gap="4">
              <Card.Title>Sign in to your account</Card.Title>
              <Card.Description>Sign in to get started.</Card.Description>
              <ClientSigninForm />
              <Link
                className="hover:underline"
                href="/auth/client/signup"
              >
                Don't have an account?
              </Link>
            </Card.Body>
          </Card.Root>
        </Flex>
      </GridItem>
    </Grid>
  );
};

AuthClientSigninPage.displayName = "AuthClientSigninPage";

export default AuthClientSigninPage;
