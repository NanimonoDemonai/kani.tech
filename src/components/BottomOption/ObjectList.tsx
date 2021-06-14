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
  }, [loading, loadingData, refetch]);
  if (loadingData) return <Fallback />;
  if (!data) return null;

  return (
    <Box>
      <UnorderedList>
        {data.getObjectList.map((e) => (
          <ListItem>{e}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};
