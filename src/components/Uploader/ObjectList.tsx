import { Box, Table, Tr, Th, Thead, Tbody, Button } from "@chakra-ui/react";
import { useEffect, VFC } from "react";
import { useAsync, useAsyncCallback } from "react-async-hook";
import { gqlClient } from "../../services/client/graphqlRequest";
import { getImageUrl } from "../../utils/getURL";
import { noop } from "../../utils/noop";
import { useEditorIsShown } from "../BottomOption/hooks/useEditorIsShown";
import { Fallback } from "../Elements/Fallback";

interface Props {
  pageName: string;
  loading: boolean;
}

const useGetObjectList = (pageName: string) =>
  useAsync<string[]>(async () => {
    const { getObjectList } = await gqlClient.GetObjectList({ key: pageName });
    return getObjectList;
  }, [pageName]);

const useDeleteObject = () =>
  useAsyncCallback<void, [string]>(async (key) => {
    await gqlClient.DeleteObject({ key });
  });

export const ObjectList: VFC<Props> = ({ pageName, loading }) => {
  const { loading: loadingData, result, execute } = useGetObjectList(pageName);
  const { loading: loadingDelete, execute: deleteObject } = useDeleteObject();
  const isEditorShown = useEditorIsShown();
  useEffect(() => {
    if (loading && loadingData && loadingDelete) execute().then(noop);
  }, [loading, loadingData, execute, pageName, loadingDelete]);

  if (loadingData) return <Fallback />;
  if (!result) return null;
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
          {result.map((e) => (
            <Tr key={e}>
              <Th>{e}</Th>
              <Th>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(e)}
                  alt="my_skin"
                  style={{ maxWidth: 30, maxHeight: 30 }}
                />
              </Th>
              {isEditorShown && (
                <Th>
                  <Button
                    disabled={loadingDelete || loading}
                    onClick={() => {
                      deleteObject(e).then(noop);
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
