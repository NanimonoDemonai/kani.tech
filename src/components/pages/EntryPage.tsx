import { Box } from "@chakra-ui/react";
import { getMDXComponent } from "mdx-bundler/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { entryDefaultSX } from "../../styles/entryDefaultSX";
import { PageMeta } from "../../types/PageMeta";
import { BottomOption } from "../BottomOption/BottomOption";
import { Fallback } from "../Elements/Fallback";
import { Article } from "../Entry/Article";
import { ImageComponent } from "../EntryComponents/ImageComponent";
import { PageMetaComponent } from "../Metas/PageMeta";

export interface EntryPageProps {
  code: string;
  pageMeta: PageMeta;
}

export const EntryPage: NextPage<EntryPageProps> = ({ code, pageMeta }) => {
  const router = useRouter();
  const Component = useMemo(() => getMDXComponent(code), [code]);
  if (router.isFallback) {
    return <Fallback />;
  }
  return (
    <Box>
      <PageMetaComponent pageMeta={pageMeta} />

      <Article>
        <Box sx={entryDefaultSX}>
          <Component components={{ img: ImageComponent(pageMeta.images) }} />
        </Box>
      </Article>
      <BottomOption />
    </Box>
  );
};
