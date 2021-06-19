import { useEffect, VFC } from "react";
import { PageMeta } from "../../types/PageMeta";
import { Title } from "./Title";
import { useDispatch } from "../hooks/store";
import { setPageMeta } from "../hooks/slices/pageMetaSlice";

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
