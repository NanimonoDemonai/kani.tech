import { Box, Table, Tr, Th, Thead, Tbody } from "@chakra-ui/react";
import { useEffect, VFC } from "react";
import { useAsync } from "react-async-hook";
import { gqlClient } from "../../services/client/graphqlRequest";
import { getImageUrl } from "../../utils/getURL";
import { noop } from "../../utils/noop";
import { Fallback } from "../Elements/Fallback";

interface Props {
  pageName: string;
  loading: boolean;
}

export const ObjectList: VFC<Props> = ({ pageName, loading }) => {
  const {
    loading: loadingData,
    result,
    execute,
  } = useAsync<string[]>(async () => {
    const { getObjectList } = await gqlClient.GetObjectList({ key: pageName });
    return getObjectList;
  }, [pageName]);
  useEffect(() => {
    if (loading && loading) execute().then(noop);
  }, [loading, loadingData, execute, pageName]);
  if (loadingData) return <Fallback />;
  if (!result) return null;

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ファイル名</Th>
            <Th>サムネイル</Th>
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
