import { GetStaticProps } from "next";
import { revalidate } from "../../../constants/revalidate";
import { getMDXSourcePageCodeAndPageMetaWithPID } from "../../../services/getMDXSourcePageCodeAndPageMetaWithPID";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";
import { MDXSourcePageProps } from "./MDXSourcePage";

export const getMDXSourcePageStaticProps: GetStaticProps<MDXSourcePageProps> =
  async ({ params }) => {
    const pid = unknownParamsToPIDParams(params);
    if (!pid) return { notFound: true, revalidate };
    const props = await getMDXSourcePageCodeAndPageMetaWithPID(pid);
    return { props, revalidate };
  };
