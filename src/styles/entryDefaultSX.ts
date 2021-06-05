import { SystemStyleObject } from "@chakra-ui/styled-system";
import { materialDarkTheme } from "./materialDarkTheme";

export const entryDefaultSX: SystemStyleObject = {
  px: 3,
  h1: {
    fontSize: "xl",
    mb: "4",
  },
  "h2,h3,h4": {
    my: 2,
  },
  p: {
    ps: 1,
    fontSize: "sm",
    lineHeight: "1.4",
  },
  a: {
    color: "red.600",
  },
  blockquote: {
    m: 2,
    p: 1,
    ps: 3,
    border: "1px",
    bg: "gray.100",
    borderRadius: 3,

    borderColor: "gray.600",
    boxShadow: "sm",
  },
  ...materialDarkTheme,
};
