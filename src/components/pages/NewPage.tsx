import { NextPage } from "next";
import { useEffect } from "react";
import { PageMeta } from "../../types/PageMeta";
import { MDXEditor } from "../MDXEditor/MDXEditor";
import {
  MDXInputSliceReducer,
  setMDXInput,
} from "../hooks/slices/MDXInputSlice";
import { useDispatch, useInjectReducer, useSelector } from "../hooks/store";
export interface NewPageProps {
  pageMeta: PageMeta;
}

export const NewPage: NextPage<NewPageProps> = ({ pageMeta }) => {
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
