import { NextPage } from "next";
import { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { PageNavbar } from "../Navbar/PageNavbar";

export const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider>
    <PageNavbar />
    <Container maxW="container.lg" fontSize="lg" p={2}>
      <Component {...pageProps} />
    </Container>
  </ChakraProvider>
);
