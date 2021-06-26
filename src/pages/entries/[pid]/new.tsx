import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { MDXEditor } from "../../../components/MDXEditor/MDXEditor";
import {
  MDXInputSliceReducer,
  setMDXInput,
} from "../../../components/hooks/slices/MDXInputSlice";
import {
  useDispatch,
  useInjectReducer,
  useSelector,
} from "../../../components/hooks/store";
import { NotFoundResponse } from "../../../constants/NotFoundResponse";
import { getExistEntry } from "../../../services/getExistEntry";
import { PageMeta } from "../../../types/PageMeta";
import { getEntryPathWithEntryName } from "../../../utils/getURL";
import { unknownParamsToPIDParams } from "../../../utils/validators/unknownParamsToPIDParams";

interface NewPageProps {
  pageMeta: PageMeta;
}

const NewPage: NextPage<NewPageProps> = ({ pageMeta }) => {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.MDXInput?.initialized);

  useInjectReducer({ MDXInput: MDXInputSliceReducer });
  useEffect(() => {
    if (!initialized) {
      dispatch(setMDXInput(pageMeta));
    }
  }, [dispatch, initialized, pageMeta]);
  return <MDXEditor />;
};

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
