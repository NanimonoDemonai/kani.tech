import { NextPage } from "next";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { useRouter } from "next/router";
import { BottomOptionButton } from "../../BottomOption/BottomOptionButton";
import { BottomOption } from "../../BottomOption/BottomOption";
import { PageMeta } from "../../../types/PageMeta";
import { PageMetaComponent } from "../../Metas/PageMeta";
import { Article } from "../../Entry/Article";

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
        <SyntaxHighlighter language="markdown" style={dark}>
          {`${source}`}
        </SyntaxHighlighter>
      </Article>

      <BottomOption>
        <BottomOptionButton href={getEntryPathWithEntryName(`${pid}`)}>
          戻る
        </BottomOptionButton>
      </BottomOption>
    </>
  );
};
