import { useRouter } from "next/router";
import { Entry } from "../entries/Entry";
import { NotFoundErrorPage } from "./NotFoundErrorPage";
import { NextPage } from "next";

export const EntryPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  if (typeof pid === "string") return <Entry pid={pid} />;
  return <NotFoundErrorPage />;
};
