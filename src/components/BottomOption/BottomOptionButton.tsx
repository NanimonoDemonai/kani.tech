import { VFC } from "react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  href: string;
  children: string;
}

export const BottomOptionButton: VFC<Props> = ({ href, children }) => (
  <NextLink href={href}>
    <Link my={1}>{children}</Link>
  </NextLink>
);
