import { NextApiRequest } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";

export interface SessionContextType {
  session: Session | null;
}

export const getContext = async ({
  req,
}: {
  req: NextApiRequest;
}): Promise<SessionContextType> => ({
  session: await getSession({ req }),
});
