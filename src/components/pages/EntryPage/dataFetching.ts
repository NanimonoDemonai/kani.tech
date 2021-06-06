import { GetStaticProps } from "next";
import {
  NotFoundResponse,
  NotFoundResponseWithRevalidate,
} from "../../../constants/NotFoundResponse";
import { revalidate } from "../../../constants/revalidate";
import { getEntryPageCodeAndPageMetaWithPID } from "../../../services/getEntryPageCodeAndPageMetaWithPID";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";
import { EntryPageProps } from "./EntryPage";

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
