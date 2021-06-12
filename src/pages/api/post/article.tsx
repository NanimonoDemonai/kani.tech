import { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { createOrUpsertEntry } from "../../../services/createOrUpsertEntry";

const handleService = async (
  session: Session,
  req: NextApiRequest
): Promise<boolean> => {
  const user = session.user;
  if (!user) return false;
  const role = session.role;
  if (role !== "USER") return false;

  console.log("Session", JSON.stringify(session.user, null, 2));
  console.log(JSON.stringify(req.body));
  await createOrUpsertEntry({
    pageName: req.body.pageName,
    pageTitle: req.body.pageTitle,
    source: req.body.source,
    tags: req.body.tags,
  });
  return true;
};

const postArticle: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (
    !(session && req.method === "POST" && (await handleService(session, req)))
  ) {
    res.status(401);
  }
  res.end();
};
export default postArticle;
