import { GetServerSideProps } from "next";
import { NewPage, NewPageProps } from "../../../components/pages/NewPage";
import { NotFoundResponse } from "../../../services/backend/NotFoundResponse";
import { getExistEntry } from "../../../services/backend/getExistEntry";
import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";

export default NewPage;

export const getServerSideProps: GetServerSideProps<NewPageProps> = async ({
  params,
}) => {
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
