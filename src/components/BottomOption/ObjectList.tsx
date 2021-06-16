import { useEffect, VFC } from "react";
import { useGetObjectListQuery } from "../../services/client/generated/graphqlCodeGen";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { Fallback } from "../Elements/Fallback";

interface Props {
  pageName: string;
  loading: boolean;
}

export const ObjectList: VFC<Props> = ({ pageName, loading }) => {
  const {
    loading: loadingData,
    data,
    refetch,
  } = useGetObjectListQuery({
    variables: { key: pageName },
  });
  useEffect(() => {
    if (loading && loading)
      refetch({ key: pageName }).then(() => {
        /*noop*/
      });
  }, [loading, loadingData, refetch, pageName]);
  if (loadingData) return <Fallback />;
  if (!data) return null;

  return (
    <Box>
      <UnorderedList>
        {data.getObjectList.map((e) => (
          <ListItem key={e}>
            {e}
            <img
              src={`http://localhost:8082/auto/plain/s3://example-space-name/${encodeURI(
                e
              )}`}
              alt="my_skin"
            />
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};
