import { MicroRequest } from "apollo-server-micro/dist/types";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";

export interface SessionContextType {
  session: Session | null;
}

export const getContext = async ({
  req,
}: {
  req: MicroRequest;
}): Promise<SessionContextType> => ({
  session: await getSession({ req }),
});
