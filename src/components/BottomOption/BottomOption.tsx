import { VFC } from "react";
import { Box, Collapse, Divider, HStack, Spacer } from "@chakra-ui/react";
import { PageModified } from "../Elements/PageModified";
import { Tags } from "../Elements/Tags";
import { PageRevision } from "../Elements/PageRevision";
import { usePageOption } from "../hooks/usePageOption";
import { BottomOptionComponents } from "./BottomOptionComponents/BottomOptionComponents";
import { BottomOptionUpperButtons } from "./BottomOptionButtons/BottomOptionUpperButtons";
import { BottomOptionBottomButtons } from "./BottomOptionButtons/BottomOptionBottomButtons";
import { useTags } from "../hooks/usePageMeta";

export const BottomOption: VFC = () => {
  const pageOption = usePageOption();
  const tags = useTags();
  return (
    <Box as={"aside"}>
      <HStack spacing={2}>
        <Tags tags={tags} />
      </HStack>

      <HStack spacing={2}>
        <Spacer />
        <PageModified />
        <PageRevision />
      </HStack>
      <Divider my={1} />
      <HStack spacing={2}>
        <Spacer />
        <BottomOptionUpperButtons />
      </HStack>

      <HStack>
        <Spacer />
        <Collapse in={pageOption.isBottomOptionShow} animateOpacity>
          <BottomOptionBottomButtons />
        </Collapse>
      </HStack>

      <BottomOptionComponents />
    </Box>
  );
};
