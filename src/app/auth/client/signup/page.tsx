import ClientSignupForm from "@/components/client/client-signup-form";
import { Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";

export interface IAuthClientSignupPageProps {}

const AuthClientSignupPage: React.FC<IAuthClientSignupPageProps> = () => {
  return (
    <Grid height="100vh">
      <GridItem>
        <Flex
          alignItems="center"
          justifyContent="center"
          height="100%"
          className="max-w-[800px] w-full mx-auto"
        >
          <Card.Root
            variant={"elevated"}
            className="w-full"
          >
            <Card.Header>
              <Card.Title>Create an account</Card.Title>
            </Card.Header>
            <Card.Body className="space-y-4">
              <ClientSignupForm />
            </Card.Body>
            <Card.Footer>
              <Link
                className="hover:underline"
                href="/auth/client/signin"
              >
                Already have an account?
              </Link>
            </Card.Footer>
          </Card.Root>
        </Flex>
      </GridItem>
    </Grid>
  );
};

AuthClientSignupPage.displayName = "AuthClientSignupPage";

export default AuthClientSignupPage;
