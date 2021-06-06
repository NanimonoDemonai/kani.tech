import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { MDXSourcePageProps } from "./MDXSourcePage";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";
import { getMDXSourcePageCodeAndPageMetaWithPID } from "../../../services/getMDXSourcePageCodeAndPageMetaWithPID";

export const getMDXSourcePageStaticProps: GetStaticProps<MDXSourcePageProps> =
  async ({ params }) => {
    const pid = unknownParamsToPIDParams(params);
    if (!pid) return { notFound: true, revalidate };
    const props = await getMDXSourcePageCodeAndPageMetaWithPID(pid);
    return { props, revalidate };
  };
