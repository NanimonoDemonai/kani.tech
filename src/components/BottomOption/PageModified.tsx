import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import locale_ja from "dayjs/locale/ja";
import { VFC } from "react";
import { Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../atoms/pageMetaAtoms";

dayjs.extend(localizedFormat);
dayjs.locale(locale_ja);

export const PageModified: VFC = () => {
  const [pageMeta] = useRecoilState(pageMetaAtoms);
  return pageMeta ? (
    <Text color="gray.400" fontSize="sm" textAlign="right">
      更新日: {dayjs(pageMeta.modified).format("LLL")}
    </Text>
  ) : null;
};
