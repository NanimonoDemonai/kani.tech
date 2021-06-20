import { Link, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import NextLink from "next/link";
import { VFC } from "react";
import { DateTime } from "../../Elements/DateTime";
import { usePageName, useRevisions } from "../../hooks/usePageMeta";

export const RevisionTable: VFC = () => {
  const revisions = useRevisions();
  const pageName = usePageName();
  if (!revisions) return null;
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>リビジョン</Th>
          <Th>更新日</Th>
        </Tr>
      </Thead>
      <Tbody>
        {revisions.map((e) => (
          <Tr key={e.revision}>
            <Td>
              <NextLink href={`/entries/${pageName}/history/${e.revision}`}>
                <Link>{e.revision}</Link>
              </NextLink>
            </Td>
            <Td>
              <DateTime date={e.createdAt} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
