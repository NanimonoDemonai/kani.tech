import { GetServerSideProps } from "next";
import { NewPageProps } from "../../../components/pages/NewPage";
import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";
import { NotFoundResponse } from "../NotFoundResponse";
import { getExistEntry } from "../getExistEntry";

export const getNewPageServerSideProps: GetServerSideProps<NewPageProps> =
  async ({ params }) => {
    const pid = unknownParamsToPIDParams(params);
    if (!pid) return NotFoundResponse;
    if (await getExistEntry(pid))
      return {
        redirect: {
          permanent: false,
          destination: getEntryPathWithEntryName(pid),
        },
      };
    return {
      props: {
        pageMeta: {
          pageName: pid,
          title: pid,
          modified: "",
          source: "",
          tags: [],
        },
      },
    };
  };
