import { useEffect, VFC } from "react";
import { PageMeta } from "../../types/PageMeta";
import { setPageMeta } from "../hooks/slices/pageMetaSlice";
import { useDispatch } from "../hooks/store";
import { Title } from "./Title";

interface Props {
  pageMeta: PageMeta;
}

export const PageMetaComponent: VFC<Props> = ({ pageMeta }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageMeta(pageMeta));
  }, [pageMeta, dispatch]);
  return <Title title={pageMeta.title} />;
};
