import { VFC } from "react";
import NextLink from "next/link";
import { Center, HStack, Link, StackDivider } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { KaniButton } from "./KaniButton";
import { CODE_REPOSITORY, SITE_NAME } from "../../constants/envNames";

export const PageNavbar: VFC = () => (
  <HStack borderColor="gray.200" shadow="md" p={2} mb={3}>
    <KaniButton />
    <NextLink href="/">
      <Link>{SITE_NAME}</Link>
    </NextLink>
    <Center h="5">
      <StackDivider borderLeft="1px" borderLeftColor="gray.200" />
    </Center>
    <NextLink href="/entries">
      <Link>Entries</Link>
    </NextLink>
    <Link href={CODE_REPOSITORY.toString()} isExternal>
      Github <ExternalLinkIcon mx="2px" />
    </Link>
  </HStack>
);
