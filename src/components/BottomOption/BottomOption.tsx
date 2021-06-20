import { Box, Collapse, Divider, HStack, Spacer } from "@chakra-ui/react";
import { VFC } from "react";
import { PageModified } from "../Elements/PageModified";
import { PageRevision } from "../Elements/PageRevision";
import { Tags } from "../Elements/Tags";
import { useTags } from "../hooks/usePageMeta";
import { usePageOption } from "../hooks/usePageOption";
import { BottomOptionBottomButtons } from "./BottomOptionButtons/BottomOptionBottomButtons";
import { BottomOptionUpperButtons } from "./BottomOptionButtons/BottomOptionUpperButtons";
import { BottomOptionComponents } from "./BottomOptionComponents/BottomOptionComponents";

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
