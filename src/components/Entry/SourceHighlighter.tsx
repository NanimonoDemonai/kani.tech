import { VFC } from "react";
import { materialDarkTheme } from "../../styles/materialDarkTheme";
import { Box } from "@chakra-ui/react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

SyntaxHighlighter.registerLanguage("markdown", markdown);
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";

export const SourceHighlighter: VFC<{ source: string }> = ({ source }) => (
  <Box sx={materialDarkTheme}>
    <SyntaxHighlighter language="markdown">{`${source}`}</SyntaxHighlighter>
  </Box>
);
