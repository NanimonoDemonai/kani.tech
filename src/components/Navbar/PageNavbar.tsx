import { VFC } from "react";
import Link from "next/link";
import { AnchorButton, Navbar } from "@blueprintjs/core";

export const PageNavbar: VFC = () => (
  <Navbar>
    <Navbar.Group>
      <Navbar.Heading>
        <Link href="/">🦀Kani.tech</Link>
      </Navbar.Heading>
      <Navbar.Divider />
      <AnchorButton target="_blank" minimal rightIcon="document">
        <Link href="/entries">Entries</Link>
      </AnchorButton>
      <AnchorButton
        text="Github"
        target="_blank"
        minimal
        rightIcon="code"
        href="https://github.com/NanimonoDemonai/kani.tech"
      />
    </Navbar.Group>
  </Navbar>
);
