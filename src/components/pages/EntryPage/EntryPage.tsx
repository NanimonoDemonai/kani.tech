import { Box } from "@chakra-ui/react";
import { getMDXComponent } from "mdx-bundler/client";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, VFC } from "react";
import { entryDefaultSX } from "../../../styles/entryDefaultSX";
import { PageMeta } from "../../../types/PageMeta";
import { getOptimizedImageURL } from "../../../utils/getURL";
import { BottomOption } from "../../BottomOption/BottomOption";
import { Fallback } from "../../Elements/Fallback";
import { Article } from "../../Entry/Article";
import { PageMetaComponent } from "../../Metas/PageMeta";
export interface EntryPageProps {
  code: string;
  pageMeta: PageMeta;
}

const ImageComponent: VFC<{ src: string } | any> = ({ src }) => (
  <Box w={300} h={300} maxW={"100%"} position={"relative"}>
    <Image
      loader={({ src, width }) => {
        return getOptimizedImageURL(src, width);
      }}
      src={src}
      alt={src}
      layout="fill"
      objectFit={"contain"}
      objectPosition={"top center"}
    />
  </Box>
);

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
          <Component
            components={{
              img: ImageComponent,
            }}
          />
        </Box>
      </Article>
      <BottomOption />
    </Box>
  );
};
