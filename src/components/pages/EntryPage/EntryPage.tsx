import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { Box } from "@chakra-ui/react";
import { getEntryMdxPathWithEntryName } from "../../../utils/getURL";
import { entryDefaultSX } from "../../../styles/entryDefaultSX";
import { BottomOptionButton } from "../../BottomOption/BottomOptionButton";
import { BottomOption } from "../../BottomOption/BottomOption";

import { PageMeta } from "../../../types/PageMeta";
import { PageMetaComponent } from "../../Metas/PageMeta";
import { Article } from "../../Entry/Article";
import { Fallback } from "../../Elements/Fallback";

export interface EntryPageProps {
  code: string;
  pageMeta: PageMeta;
}

export const EntryPage: NextPage<EntryPageProps> = ({ code, pageMeta }) => {
  const router = useRouter();
  const { pid } = router.query;
  const Component = useMemo(() => getMDXComponent(code), [code]);
  if (router.isFallback) {
    return <Fallback />;
  }
  return (
    <Box>
      <PageMetaComponent pageMeta={pageMeta} />

      <Article>
        <Box sx={entryDefaultSX}>
          <Component />
        </Box>
      </Article>
      <BottomOption>
        <BottomOptionButton href={getEntryMdxPathWithEntryName(String(pid))}>
          ソースコード
        </BottomOptionButton>
      </BottomOption>
    </Box>
  );
};
