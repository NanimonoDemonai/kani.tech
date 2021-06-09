import { NextPage } from "next";
import { useRouter } from "next/router";
import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { BottomOptionButton } from "../../BottomOption/BottomOptionButton";
import { BottomOption } from "../../BottomOption/BottomOption";
import { PageMeta } from "../../../types/PageMeta";
import { PageMetaComponent } from "../../Metas/PageMeta";
import { Article } from "../../Entry/Article";
import { SourceHighlighter } from "../../Entry/SourceHighlighter";
import { Fallback } from "../../Elements/Fallback";
import Link from "next/link";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export interface MDXSourcePageProps {
  pageMeta: PageMeta;
}

export const MDXSourcePage: NextPage<MDXSourcePageProps> = ({ pageMeta }) => {
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
          <Link href={getEntryPathWithEntryName(`${pid}`)}>
            <BreadcrumbLink>{pid}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">mdx</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Article>
        <SourceHighlighter source={pageMeta.source} />
      </Article>

      <BottomOption>
        <BottomOptionButton href={getEntryPathWithEntryName(`${pid}`)}>
          戻る
        </BottomOptionButton>
      </BottomOption>
    </Box>
  );
};
