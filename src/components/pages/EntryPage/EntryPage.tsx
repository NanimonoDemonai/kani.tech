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

export interface EntryPageProps {
  code: string;
  pageMeta: PageMeta;
}

export const EntryPage: NextPage<EntryPageProps> = ({ code, pageMeta }) => {
  const router = useRouter();
  const { pid } = router.query;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Box as={"article"} minH={"2xl"}>
        <PageMetaComponent pageMeta={pageMeta} />
        <Box sx={entryDefaultSX}>
          <Component />
        </Box>
      </Box>
      <BottomOption>
        <BottomOptionButton href={getEntryMdxPathWithEntryName(pid as string)}>
          ソースコード
        </BottomOptionButton>
      </BottomOption>
    </>
  );
};
