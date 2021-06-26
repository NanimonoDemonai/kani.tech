import { GetServerSideProps } from "next";
import {
  NewPage,
  NewPageProps,
} from "../../../components/pages/NewPage/NewPage";
import { NotFoundResponse } from "../../../constants/NotFoundResponse";
import { getExistEntry } from "../../../services/getExistEntry";
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
