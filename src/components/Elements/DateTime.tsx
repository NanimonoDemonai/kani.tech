import { VFC } from "react";
import { Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import locale_ja from "dayjs/locale/ja";

dayjs.extend(localizedFormat);
dayjs.locale(locale_ja);
export const DateTime: VFC<{ date: any; label?: string }> = ({
  date,
  label,
}) => (
  <Text color="gray.400" fontSize="sm">
    {label && `${label}: `}
    {dayjs(date).format("LLL")}
  </Text>
);
