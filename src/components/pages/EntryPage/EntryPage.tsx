import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { Box } from "@chakra-ui/react";
import { getEntryMdxPathWithEntryName } from "../../../utils/getURL";
import { entryDefaultSX } from "../../../styles/entryDefaultSX";
import { BottomOptionButton } from "../../BottomOption/BottomOptionButton";
import { BottomOption } from "../../BottomOption/BottomOption";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import locale_ja from "dayjs/locale/ja";
import { PageMeta } from "../../../types/PageMeta";
import { PageMetaComponent } from "../../Metas/PageMeta";

export interface EntryPageProps {
  code: string;
  pageMeta: PageMeta;
}
dayjs.extend(localizedFormat);
dayjs.locale(locale_ja);
export const EntryPage: NextPage<EntryPageProps> = ({ code, pageMeta }) => {
  const router = useRouter();
  const { pid } = router.query;
  const Component = useMemo(() => getMDXComponent(code), [code]);
  dayjs.locale("ja");

  return (
    <>
      <Box as={"article"} minH={"2xl"}>
        <PageMetaComponent pageMeta={pageMeta} />
        <Box sx={entryDefaultSX}>
          <Component />
        </Box>
      </Box>
      {dayjs(pageMeta.modified).format("LLL")}
      <BottomOption>
        <BottomOptionButton href={getEntryMdxPathWithEntryName(pid as string)}>
          ソースコード
        </BottomOptionButton>
      </BottomOption>
    </>
  );
};
