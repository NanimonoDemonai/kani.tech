import { GetStaticProps } from "next";
import { TaggedEntryListProps } from "../../../components/pages/TaggedEntryListPage";
import { revalidate } from "../../../constants/revalidate";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";
import {
  NotFoundResponse,
  NotFoundResponseWithRevalidate,
} from "../NotFoundResponse";
import { getEntriesByTag } from "../getEntriesByTag";

export const getTaggedEntryPageListStaticProps: GetStaticProps<TaggedEntryListProps> =
  async ({ params }) => {
    const pid = unknownParamsToPIDParams(params);
    if (!pid) return NotFoundResponse;
    const entryPageList = await getEntriesByTag(pid);
    if (entryPageList.length === 0) return NotFoundResponseWithRevalidate;
    return { props: { entryPageList }, revalidate };
  };
