import { NextPage } from "next";
import { FrontMatter } from "../../../types/FrontMatter";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { useRouter } from "next/router";
import { Title } from "../../Metas/Title";
import { BottomOptionButton } from "../../BottomOption/BottomOptionButton";
import { BottomOption } from "../../BottomOption/BottomOption";

SyntaxHighlighter.registerLanguage("markdown", markdown);

export interface MDXSourcePageProps {
  source: string;
  frontMatter: FrontMatter;
}

export const MDXSourcePage: NextPage<MDXSourcePageProps> = ({
  source,
  frontMatter: { title },
}) => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <>
      <Title title={title + "/source"} />
      <article>
        <SyntaxHighlighter language="markdown" style={dark}>
          {`${source}`}
        </SyntaxHighlighter>
      </article>
      <BottomOption>
        <BottomOptionButton href={getEntryPathWithEntryName(`${pid}`)}>
          戻る
        </BottomOptionButton>
      </BottomOption>
    </>
  );
};
