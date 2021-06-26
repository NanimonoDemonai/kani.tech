import { GetStaticProps } from "next";
import { EntryPageProps } from "../../../components/pages/EntryPage";
import {
  NotFoundResponse,
  NotFoundResponseWithRevalidate,
} from "../../../constants/NotFoundResponse";
import { revalidate } from "../../../constants/revalidate";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";
import { getEntryPageCodeAndPageMetaWithPID } from "../getEntryPageCodeAndPageMetaWithPID";

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
