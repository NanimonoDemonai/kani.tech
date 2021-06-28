import {
  Box,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Code,
  Td,
  Button,
  Alert,
  AlertIcon,
  HStack,
} from "@chakra-ui/react";
import fileSize from "filesize";
import { useEffect, VFC } from "react";
import { Fallback } from "../Elements/Fallback";
import { loadObject } from "../hooks/slices/FileUploaderSlice";
import { useDispatch } from "../hooks/store";
import { useEditorIsShown } from "../hooks/useEditorIsShown";
import { useLoading, useObjectList } from "../hooks/useUploader";
import { DeleteButton } from "./DeleteButton";
import { ThumbnailImage } from "./ThumbnailImage";

export const ObjectList: VFC = () => {
  const dispatch = useDispatch();
  const isEditorShown = useEditorIsShown();
  const objectList = useObjectList();
  const loading = useLoading();
  useEffect(() => {
    dispatch(loadObject());
  }, [dispatch]);

  if (loading) return <Fallback />;
  if (objectList.length < 1) return null;
  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ファイル名</Th>
            <Th>サムネイル</Th>
            <Th>サイズ</Th>
            {isEditorShown && <Th>編集</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {objectList.map((e) => (
            <Tr key={e.key}>
              <Td>
                <Code isTruncated>{e.url}</Code>
              </Td>
              <Td>
                <ThumbnailImage src={e.key} />
              </Td>
              <Td>{`${e.width}×${e.height} (${fileSize(e.size)})`}</Td>
              {isEditorShown && (
                <Th>
                  {e.verified === "PENDING" ? (
                    <HStack>
                      <Alert status="warning">
                        <AlertIcon />
                        アップロード保留中
                      </Alert>
                      <Button disabled={true}>削除</Button>
                    </HStack>
                  ) : (
                    <>
                      <HStack>
                        {e.verified !== "VERIFIED" && (
                          <Alert status="error">
                            <AlertIcon />
                            アップロードに不備がありました Code:{e.verified}
                          </Alert>
                        )}
                        <DeleteButton objectKey={e.key} />
                      </HStack>
                    </>
                  )}
                </Th>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
