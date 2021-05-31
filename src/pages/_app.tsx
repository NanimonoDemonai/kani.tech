import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import type { AppProps } from "next/app";
import { VFC } from "react";
import { PageNavbar } from "../components/Navbar/PageNavbar";
import { Box } from "@fower/react";

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => (
  <Box minH52>
    <PageNavbar />
    <div id="wrapper" row toCenterX>
      <main p5 textLG maxW--lg="70%" w="100%">
        <Component {...pageProps} />
      </main>
    </div>
  </Box>
);

export default MyApp;
