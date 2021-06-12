import { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";

const handleService = (session: Session, req: NextApiRequest): boolean => {
  const user = session.user;
  if (!user) return false;
  const role = session.role;
  if (role !== "USER") return false;

  console.log("Session", JSON.stringify(session.user, null, 2));
  console.log(JSON.stringify(req.body));
  return true;
};
const postArticle: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!(session && req.method === "POST" && handleService(session, req))) {
    res.status(401);
  }
  res.end();
};
export default postArticle;
