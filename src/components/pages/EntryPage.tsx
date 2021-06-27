import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PageMeta } from "../../types/PageMeta";
import { BottomOption } from "../BottomOption/BottomOption";
import { EntryViewer } from "../Elements/EntryViewer";
import { Fallback } from "../Elements/Fallback";
import { Article } from "../Entry/Article";
import { PageMetaComponent } from "../Metas/PageMeta";

export interface EntryPageProps {
  code: string;
  pageMeta: PageMeta;
}

export const EntryPage: NextPage<EntryPageProps> = ({ code, pageMeta }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Fallback />;
  }
  return (
    <Box>
      <PageMetaComponent pageMeta={pageMeta} />
      <Article>
        <EntryViewer images={pageMeta.images} code={code} />
      </Article>
      <BottomOption />
    </Box>
  );
};
