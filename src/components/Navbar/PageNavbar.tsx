import { ExternalLinkIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  IconButton,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import NextLink from "next/link";
import { VFC } from "react";
import { CODE_REPOSITORY, SITE_NAME } from "../../constants/envNames";
import { useTitle } from "../hooks/usePageMeta";
import { KaniButton } from "./KaniButton";
import { NavBarDivider } from "./NavBarDivider";

export const PageNavbar: VFC = () => {
  const title = useTitle();
  const [session] = useSession();

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

            {!session && (
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="ログアウト"
                icon={<UnlockIcon />}
                onClick={() => {
                  signIn();
                }}
                size="sm"
              />
            )}
            {session && (
              <HStack>
                <Avatar
                  size="sm"
                  name={session.user?.name || undefined}
                  src={session.user?.image || undefined}
                />
                <IconButton
                  colorScheme="red"
                  variant="outline"
                  aria-label="ログアウト"
                  icon={<LockIcon />}
                  onClick={() => {
                    signOut();
                  }}
                  size="sm"
                />
              </HStack>
            )}
          </HStack>
        </nav>
      </HStack>
    </Box>
  );
};
