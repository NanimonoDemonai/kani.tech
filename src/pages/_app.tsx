import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "windi.css";
import type { AppProps } from "next/app";
import { VFC } from "react";
import { PageNavbar } from "../components/Navbar/PageNavbar";
import clsx from "clsx";

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => (
  <div className={clsx(["min-h-screen", "bg-hero-diagonal-lines"])}>
    <PageNavbar />
    <div
      className={clsx([
        "container",
        "mx-auto",
        "text-black-500",
        "max-w-screen-lg",
        "min-h-screen-md",
        "p-4",
      ])}
    >
      <Component {...pageProps} />
    </div>
  </div>
);

export default MyApp;
