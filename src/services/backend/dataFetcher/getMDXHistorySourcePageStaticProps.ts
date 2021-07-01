import { GetStaticProps } from "next";
import { MDXHistorySourcePageProps } from "../../../components/pages/MDXHistorySourcePage";
import { revalidate } from "../../../constants/NextSecretEnv";
import { unknownParamsToPIDRevParams } from "../../../utils/validators/unknownParamsToPIDRevParams";
import { NotFoundResponseWithRevalidate } from "../NotFoundResponse";
import { getMDXHistorySourcePageCodeAndPageMetaWithPIDRev } from "../getMDXHistorySourcePageCodeAndPageMetaWithPIDRev";

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
