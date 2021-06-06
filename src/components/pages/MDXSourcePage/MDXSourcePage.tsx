import { NextPage } from "next";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";

import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { useRouter } from "next/router";
import { BottomOptionButton } from "../../BottomOption/BottomOptionButton";
import { BottomOption } from "../../BottomOption/BottomOption";
import { PageMeta } from "../../../types/PageMeta";
import { PageMetaComponent } from "../../Metas/PageMeta";
import { Article } from "../../Entry/Article";
import { Box } from "@chakra-ui/react";
import { entryDefaultSX } from "../../../styles/entryDefaultSX";

SyntaxHighlighter.registerLanguage("markdown", markdown);

export interface MDXSourcePageProps {
  source: string;
  pageMeta: PageMeta;
}

export const MDXSourcePage: NextPage<MDXSourcePageProps> = ({
  source,
  pageMeta,
}) => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <>
      <PageMetaComponent pageMeta={pageMeta} />

      <Article>
        <Box sx={entryDefaultSX}>
          <SyntaxHighlighter language="markdown">{`${source}`}</SyntaxHighlighter>
        </Box>
      </Article>

      <BottomOption>
        <BottomOptionButton href={getEntryPathWithEntryName(`${pid}`)}>
          戻る
        </BottomOptionButton>
      </BottomOption>
    </>
  );
};
