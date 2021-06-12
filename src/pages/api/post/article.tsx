import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

const postArticle: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (session && req.method === "POST") {
    console.log("Session", JSON.stringify(session, null, 2));
    console.log(JSON.stringify(req.body));
  } else {
    res.status(401);
  }
  res.end();
};
export default postArticle;
