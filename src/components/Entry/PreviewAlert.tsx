import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { VFC } from "react";

export const PreviewAlert: VFC = () => (
  <>
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>プレビュー</AlertTitle>
      <AlertDescription>編集プレビューです</AlertDescription>
    </Alert>
  </>
);
