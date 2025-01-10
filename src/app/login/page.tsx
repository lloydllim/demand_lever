import { Button, Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const LoginPage: React.FC<{}> = () => {
  return (
    <Grid height="100vh">
      <GridItem>
        <Flex alignItems="center" justifyContent="center" height="100%">
          <Card.Root width="320px" variant={"elevated"}>
            <Card.Body gap="4">
              <Card.Title>Welcome back,</Card.Title>
              <Card.Description>
                Choose the account you want to sign in to.
              </Card.Description>
              <Button color="black" type="button" variant={"outline"} asChild>
                <Link href="/login/clients">Sign in as client</Link>
              </Button>

              <Button color="black" type="button" variant={"outline"} asChild>
                <Link href="/login/sdr">Sign in as sdr</Link>
              </Button>
              <Button color="black" type="button" variant={"outline"} asChild>
                <Link href="/login/admin">Sign in as admin</Link>
              </Button>
            </Card.Body>
          </Card.Root>
        </Flex>
      </GridItem>
    </Grid>
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
