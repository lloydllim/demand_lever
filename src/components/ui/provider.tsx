"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

export function Provider(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider
        defaultTheme="light"
        attribute="class"
        disableTransitionOnChange
      >
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
