import { useRouter } from "next/router";
import { Entry } from "../entries/Entry";
import { NotFoundErrorPage } from "./NotFoundErrorPage";
import { NextPage } from "next";
import dynamic from "next/dynamic";

export const EntryPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const EntryComponent = dynamic(() =>
    import(`../../entries/${pid}.mdx`)
      .then((mod) => mod)
      .catch(() => NotFoundErrorPage)
  );
  if (typeof pid === "string") return <Entry Component={EntryComponent} />;
  return <NotFoundErrorPage />;
};
