import { NextPage } from "next";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { PageNavbar } from "../Navbar/PageNavbar";

export const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider resetCSS>
    <PageNavbar />
    <Component {...pageProps} />
  </ChakraProvider>
);
