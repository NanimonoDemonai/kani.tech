import { VFC } from "react";
import NextLink from "next/link";
import { Heading, HStack, Link, Spacer } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { KaniButton } from "./KaniButton";
import { CODE_REPOSITORY, SITE_NAME } from "../../constants/envNames";
import { useRecoilState } from "recoil";
import { titleAtoms } from "../../atoms/titleAtoms";
import { NavBarDivider } from "./NavBarDivider";

export const PageNavbar: VFC = () => {
  const [title] = useRecoilState(titleAtoms);

  return (
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
        </HStack>
      </nav>
    </HStack>
  );
};
