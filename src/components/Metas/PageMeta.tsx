import { useEffect, VFC } from "react";
import { useRecoilState } from "recoil";
import { pageMetaAtoms } from "../../atoms/pageMetaAtoms";
import { PageMeta } from "../../types/PageMeta";
import { Title } from "./Title";

interface Props {
  pageMeta: PageMeta;
}

export const PageMetaComponent: VFC<Props> = ({ pageMeta }) => {
  const setPageMeta = useRecoilState(pageMetaAtoms)[1];
  useEffect(() => {
    setPageMeta(pageMeta);
  }, [pageMeta]);
  return <Title title={pageMeta.title} />;
};
