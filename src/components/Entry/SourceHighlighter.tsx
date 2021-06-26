import { Box } from "@chakra-ui/react";
import { VFC } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import { materialDarkTheme } from "../../styles/materialDarkTheme";

SyntaxHighlighter.registerLanguage("markdown", markdown);

export interface SourceHighlighterProps {
  source: string;
}
export const SourceHighlighter: VFC<SourceHighlighterProps> = ({ source }) => (
  <Box sx={materialDarkTheme}>
    <SyntaxHighlighter language="markdown">{`${source}`}</SyntaxHighlighter>
  </Box>
);
