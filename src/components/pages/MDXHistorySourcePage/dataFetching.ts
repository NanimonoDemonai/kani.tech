import { GetStaticProps } from "next";
import { NotFoundResponseWithRevalidate } from "../../../constants/NotFoundResponse";
import { revalidate } from "../../../constants/revalidate";
import { getMDXHistorySourcePageCodeAndPageMetaWithPIDRev } from "../../../services/getMDXHistorySourcePageCodeAndPageMetaWithPIDRev";
import { unknownParamsToPIDRevParams } from "../../../utils/validators/unknownParamsToPIDRevParams";
import { MDXHistorySourcePageProps } from "./MDXHistorySourcePage";

export const getMDXHistorySourcePageStaticProps: GetStaticProps<MDXHistorySourcePageProps> =
  async ({ params }) => {
    const data = unknownParamsToPIDRevParams(params);
    if (!data) return NotFoundResponseWithRevalidate;
    const { pid, rev } = data;
    const revision = parseInt(rev);
    if (isNaN(revision)) return NotFoundResponseWithRevalidate;
    const props = await getMDXHistorySourcePageCodeAndPageMetaWithPIDRev(
      pid,
      revision
    );
    if (!props) return NotFoundResponseWithRevalidate;
    return { props, revalidate };
  };
