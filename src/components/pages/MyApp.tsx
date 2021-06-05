import { NextPage } from "next";
import { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { PageNavbar } from "../Navbar/PageNavbar";
import { RecoilRoot } from "recoil";
import { Footer } from "../Footer/Footer";

export const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <RecoilRoot>
    <ChakraProvider>
      <PageNavbar />
      <Container
        maxW="container.lg"
        fontSize="lg"
        p={2}
        minH={"4xl"}
        sx={{
          a: {
            color: "red.600",
          },
        }}
      >
        <Component {...pageProps} />
      </Container>
      <Footer />
    </ChakraProvider>
  </RecoilRoot>
);
