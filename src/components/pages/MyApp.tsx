import { NextPage } from "next";
import { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { PageNavbar } from "../Navbar/PageNavbar";
import { RecoilRoot } from "recoil";

export const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <RecoilRoot>
    <ChakraProvider>
      <PageNavbar />
      <Container maxW="container.lg" fontSize="lg" p={2}>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  </RecoilRoot>
);
