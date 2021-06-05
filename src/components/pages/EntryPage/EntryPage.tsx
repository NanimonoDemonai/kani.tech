import { NextPage } from "next";
import { FrontMatter } from "../../../types/FrontMatter";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Title } from "../../Metas/Title";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { getEntryMdxPathWithEntryName } from "../../../utils/getURL";
import { EntryDefaultSX } from "../../../EntryDefaultSX";

export interface EntryPageProps {
  code: string;
  frontMatter: FrontMatter;
}

export const EntryPage: NextPage<EntryPageProps> = ({
  code,
  frontMatter: { title },
}) => {
  const router = useRouter();
  const { pid } = router.query;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <article>
        <Title title={title} />
        <Heading fontSize="2xl">{title}</Heading>
        <Divider />
        <Box sx={EntryDefaultSX}>
          <Component />
        </Box>
      </article>
      <Box pt={3}>
        <Divider />
        <NextLink href={getEntryMdxPathWithEntryName(pid as string)}>
          <Button my={4}>ソースコード</Button>
        </NextLink>
      </Box>
    </>
  );
};
