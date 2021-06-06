import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { EntryPageProps } from "./EntryPage";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";
import { getEntryPageCodeAndPageMetaWithPID } from "../../../services/getEntryPageCodeAndPageMetaWithPID";
import {
  NotFoundResponse,
  NotFoundResponseWithRevalidate,
} from "../../../constants/NotFoundResponse";

export const getEntryPageStaticProps: GetStaticProps<EntryPageProps> = async ({
  params,
}) => {
  const pid = unknownParamsToPIDParams(params);
  if (!pid) return NotFoundResponse;
  try {
    const props = await getEntryPageCodeAndPageMetaWithPID(pid);
    if (!props) return NotFoundResponse;
    return { props, revalidate };
  } catch (e) {
    return NotFoundResponseWithRevalidate;
  }
};
