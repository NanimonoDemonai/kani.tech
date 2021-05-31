import { NextPage } from "next";
import { AppProps } from "next/app";
import { PageNavbar } from "../Navbar/PageNavbar";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@fower/react";

export const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <div id="wrapper-wrapper" minH52>
    <PageNavbar />
    <div id="wrapper" row toCenterX>
      <main p5 textLG maxW--lg="70%" w="100%">
        <Component {...pageProps} />
      </main>
    </div>
  </div>
);
