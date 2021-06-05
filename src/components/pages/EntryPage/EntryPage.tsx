import { NextPage } from "next";
import { FrontMatter } from "../../../types/FrontMatter";
import { useRouter } from "next/router";
import { Title } from "../../Metas/Title";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { Box, Divider, Heading } from "@chakra-ui/react";
import { getEntryMdxPathWithEntryName } from "../../../utils/getURL";
import { entryDefaultSX } from "../../../styles/entryDefaultSX";
import { BottomOptionButton } from "../../BottomOption/BottomOptionButton";
import { BottomOption } from "../../BottomOption/BottomOption";

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
        <Box sx={entryDefaultSX}>
          <Component />
        </Box>
      </article>
      <BottomOption>
        <BottomOptionButton href={getEntryMdxPathWithEntryName(pid as string)}>
          ソースコード
        </BottomOptionButton>
      </BottomOption>
    </>
  );
};
