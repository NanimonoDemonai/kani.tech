import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { PageMeta } from "../../types/PageMeta";
import { getEntryPathWithEntryName } from "../../utils/getURL";
import { BottomOption } from "../BottomOption/BottomOption";
import { BottomOptionButton } from "../BottomOption/BottomOptionButtons/BottomOptionButton";
import { Fallback } from "../Elements/Fallback";
import { Article } from "../Entry/Article";
import { SourceHighlighter } from "../Entry/SourceHighlighter";
import { PageMetaComponent } from "../Metas/PageMeta";

export interface MDXHistorySourcePageProps {
  pageMeta: PageMeta;
}

export const MDXHistorySourcePage: NextPage<MDXHistorySourcePageProps> = ({
  pageMeta,
}) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Fallback />;
  }
  const { pid } = router.query;
  return (
    <Box>
      <PageMetaComponent pageMeta={pageMeta} />
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <Link href={getEntryPathWithEntryName(`${pid}`)} passHref>
            <BreadcrumbLink>{pid}の更新履歴</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Revision {pageMeta.revision}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Article>
        <SourceHighlighter source={pageMeta.source} />
        <BottomOptionButton href={getEntryPathWithEntryName(`${pid}`)}>
          ページに戻る
        </BottomOptionButton>
      </Article>
      <BottomOption />
    </Box>
  );
};
