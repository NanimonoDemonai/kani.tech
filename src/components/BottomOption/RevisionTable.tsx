import { VFC } from "react";
import { Link, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import NextLink from "next/link";
import { DateTime } from "../Elements/DateTime";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../hooks/atoms/pageMetaAtoms";

export const RevisionTable: VFC = () => {
  const pageMeta = useRecoilState(pageMetaAtoms)[0];
  if (!pageMeta) return null;
  if (!pageMeta.revisions) return null;
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>リビジョン</Th>
          <Th>更新日</Th>
        </Tr>
      </Thead>
      <Tbody>
        {pageMeta.revisions.map((e) => (
          <Tr key={e.revision}>
            <Td>
              <NextLink
                href={`/entries/${pageMeta.pageName}/history/${pageMeta.revision}`}
              >
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
