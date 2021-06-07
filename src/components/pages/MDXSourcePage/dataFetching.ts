import { GetStaticProps } from "next";
import { NotFoundResponseWithRevalidate } from "../../../constants/NotFoundResponse";
import { revalidate } from "../../../constants/revalidate";
import { getMDXSourcePageCodeAndPageMetaWithPID } from "../../../services/getMDXSourcePageCodeAndPageMetaWithPID";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";
import { MDXSourcePageProps } from "./MDXSourcePage";

export const getMDXSourcePageStaticProps: GetStaticProps<MDXSourcePageProps> =
  async ({ params }) => {
    const pid = unknownParamsToPIDParams(params);
    if (!pid) return NotFoundResponseWithRevalidate;
    const props = await getMDXSourcePageCodeAndPageMetaWithPID(pid);
    if (!props) return NotFoundResponseWithRevalidate;
    return { props, revalidate };
  };
