import { Text } from "@chakra-ui/react";
import dayjs, { ConfigType, extend, locale } from "dayjs";

import locale_ja from "dayjs/locale/ja";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { VFC } from "react";

extend(localizedFormat);
locale(locale_ja);
export const DateTime: VFC<{ date: ConfigType; label?: string }> = ({
  date,
  label,
}) => (
  <Text color="gray.400" fontSize="sm">
    {label && `${label}: `}
    {dayjs(date).format("LLL")}
  </Text>
);
