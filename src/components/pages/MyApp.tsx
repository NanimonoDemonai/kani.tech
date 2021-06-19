import { NextPage } from "next";
import { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { PageNavbar } from "../Navbar/PageNavbar";
import { Footer } from "../Footer/Footer";
import { Provider as NextAuthProvide } from "next-auth/client";
import { Provider } from "react-redux";
import { store } from "../hooks/store";

export const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <NextAuthProvide session={pageProps.session}>
    <Provider store={store}>
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
    </Provider>
  </NextAuthProvide>
);
