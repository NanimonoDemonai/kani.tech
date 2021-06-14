import { VFC } from "react";
import { useGetObjectListQuery } from "../../services/client/generated/graphqlCodeGen";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";

interface Props {
  pageName: string;
}

export const ObjectList: VFC<Props> = ({ pageName }) => {
  const { loading, data } = useGetObjectListQuery({
    variables: { key: pageName },
  });
  if (loading) return null;
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
