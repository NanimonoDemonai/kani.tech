import { Bucket } from "../../../constants/NextPublicEnvs";
import { MutationResolvers } from "../../../types/generated/graphqlCodeGen";
import { prisma } from "../client/PrismClient";
import { s3 } from "../client/S3";
import { isUser } from "./rootResolvers";

export const updateObjectStatus: MutationResolvers["updateObjectStatus"] =
  async (parent, { key, isError }, context) => {
    isUser(context);
    if (isError) {
      await prisma.imageObject.update({
        where: { key },
        data: {
          verified: "ERROR",
        },
      });
      return { id: key };
    }
    const head = await s3.headObject({ Bucket, Key: key }).promise();
    if (head)
      await prisma.imageObject.update({
        where: {
          key,
        },
        data: {
          verified: head ? "VERIFIED" : "ERROR",
        },
      });
    return { id: key };
  };
