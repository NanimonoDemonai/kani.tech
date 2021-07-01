import dayjs from "dayjs";
import { uploaderTimeout } from "../../../constants/NextSecretEnv";
import { QueryResolvers } from "../../../types/generated/graphqlCodeGen";
import { noop } from "../../../utils/noop";
import { prisma } from "../client/PrismClient";
import { updateObjectsStatus } from "../updateObjectsStatus";
import { AuthenticationError, isUser } from "./rootResolvers";

export const getObjectListResolver: QueryResolvers["getObjectList"] = async (
  parent,
  { keyPrefix },
  context
) => {
  isUser(context);

  const objects = await prisma.entry.findUnique({
    where: { pageName: keyPrefix },
    include: {
      directory: {
        include: {
          imageObjects: true,
        },
      },
    },
  });
  if (!objects) throw new AuthenticationError("permission denied");
  const directory = objects.directory;
  if (directory) {
    updateObjectsStatus(
      directory.imageObjects
        .filter(
          (e) =>
            e.verified === "PENDING" &&
            dayjs().diff(dayjs(e.updatedAt), "minute") > uploaderTimeout
        )
        .map((e) => e.key),
      "ERROR"
    ).then(noop);
    return directory.imageObjects.map((e) => ({
      ...e,
      modified: e.updatedAt.toJSON(),
    }));
  }
  return [];
};
