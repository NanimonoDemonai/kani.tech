import { GetStaticProps } from "next";
import {
  NotFoundResponse,
  NotFoundResponseWithRevalidate,
} from "../../../constants/NotFoundResponse";
import { revalidate } from "../../../constants/revalidate";
import { getEntriesByTag } from "../../../services/getEntriesByTag";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";
import { TaggedEntryListProps } from "./TaggedEntryListPage";

export const getTaggedEntryPageListStaticProps: GetStaticProps<TaggedEntryListProps> =
  async ({ params }) => {
    const pid = unknownParamsToPIDParams(params);
    if (!pid) return NotFoundResponse;
    const entryPageList = await getEntriesByTag(pid);
    if (entryPageList.length === 0) return NotFoundResponseWithRevalidate;
    return { props: { entryPageList }, revalidate };
  };
