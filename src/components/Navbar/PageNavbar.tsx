import { VFC } from "react";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { KaniButton } from "./KaniButton";
import { CODE_REPOSITORY, SITE_NAME } from "../../constants/envNames";
import { useRecoilState } from "recoil";
import { titleAtoms } from "../hooks/atoms/titleAtoms";
import { NavBarDivider } from "./NavBarDivider";
import { signIn, signOut, useSession } from "next-auth/client";

export const PageNavbar: VFC = () => {
  const [title] = useRecoilState(titleAtoms);
  const [session, loading] = useSession();

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

            {!loading && !session && (
              <IconButton
                colorScheme="blue"
                aria-label="ログアウト"
                icon={<UnlockIcon />}
                onClick={() => {
                  signIn();
                }}
                size="sm"
              />
            )}
            {!loading && session && (
              <HStack>
                <IconButton
                  colorScheme="blue"
                  aria-label="ログアウト"
                  icon={<LockIcon />}
                  onClick={() => {
                    signOut();
                  }}
                  size="sm"
                />
                <Avatar
                  size="sm"
                  name={session.user?.name || undefined}
                  src={session.user?.image || undefined}
                />
                <Text fontSize="lg">{session.user?.name}</Text>
              </HStack>
            )}
          </HStack>
        </nav>
      </HStack>
    </Box>
  );
};
