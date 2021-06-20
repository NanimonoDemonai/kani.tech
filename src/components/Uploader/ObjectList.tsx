import {
  Box,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Button,
  Code,
  Td,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, VFC } from "react";
import { getOptimizedImageURL } from "../../utils/getURL";
import { useEditorIsShown } from "../BottomOption/hooks/useEditorIsShown";
import { Fallback } from "../Elements/Fallback";
import { deleteFile, loadObject } from "../hooks/slices/FileUploaderSlice";
import { useDispatch } from "../hooks/store";
import {
  useIsDisabling,
  useLoading,
  useObjectList,
} from "../hooks/useUploader";

export const ObjectList: VFC = () => {
  const dispatch = useDispatch();
  const disabled = useIsDisabling();
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
            {isEditorShown && <Th>編集</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {objectList.map((e) => (
            <Tr key={e}>
              <Td>
                <Code isTruncated>{e}</Code>
              </Td>
              <Td>
                <Box w={30} h={30} position={"relative"}>
                  <Image
                    loader={({ src, width }) => {
                      return getOptimizedImageURL(src, width);
                    }}
                    src={e}
                    alt={e}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              </Td>
              {isEditorShown && (
                <Th>
                  <Button
                    disabled={disabled || loading}
                    onClick={() => {
                      dispatch(deleteFile({ key: e }));
                    }}
                  >
                    削除
                  </Button>
                </Th>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
