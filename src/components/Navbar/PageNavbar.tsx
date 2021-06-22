import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { VFC } from "react";
import { CODE_REPOSITORY, SITE_NAME } from "../../constants/envNames";
import { useTitle } from "../hooks/usePageMeta";
import { KaniButton } from "./KaniButton";
import { LoginButton } from "./LoginButton";
import { NavBarDivider } from "./NavBarDivider";

export const PageNavbar: VFC = () => {
  const title = useTitle();
  return (
    <Box>
      <HStack borderColor="gray.200" shadow="md" p={2} px={30} mb={3}>
        <header>
          <HStack>
            <KaniButton />
            <NextLink href="/">
              <Link>{SITE_NAME}</Link>
            </NextLink>
          </HStack>
        </header>
        <NavBarDivider />
        <Heading fontSize="sm">{title}</Heading>
        <Spacer />
        <nav>
          <HStack>
            <NextLink href="/entries">
              <Link>Entries</Link>
            </NextLink>
            <NavBarDivider />
            <Link href={CODE_REPOSITORY.toString()} isExternal>
              Github <ExternalLinkIcon mx="2px" />
            </Link>
            <LoginButton />
          </HStack>
        </nav>
      </HStack>
    </Box>
  );
};
