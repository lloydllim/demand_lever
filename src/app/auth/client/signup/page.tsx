import ClientSignupForm from "@/components/client/client-signup-form";
import { Card, Flex, Grid, GridItem } from "@chakra-ui/react";

export interface IAuthClientSignupPageProps {}

const AuthClientSignupPage: React.FC<IAuthClientSignupPageProps> = () => {
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
              <Card.Title>Create an account</Card.Title>
              <Card.Description>Sign up to get started.</Card.Description>

              <ClientSignupForm />
            </Card.Body>
          </Card.Root>
        </Flex>
      </GridItem>
    </Grid>
  );
};

AuthClientSignupPage.displayName = "AuthClientSignupPage";

export default AuthClientSignupPage;
