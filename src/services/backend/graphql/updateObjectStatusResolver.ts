import { Bucket } from "../../../constants/NextPublicEnvs";
import { MutationResolvers } from "../../../types/generated/graphqlCodeGen";
import { s3 } from "../client/S3";
import { updateObjectsStatus } from "../updateObjectsStatus";
import { isUser } from "./rootResolvers";

export const updateObjectStatusResolver: MutationResolvers["updateObjectStatus"] =
  async (parent, { key, isError }, context) => {
    isUser(context);
    if (isError) {
      await updateObjectsStatus([key], "ERROR");
      return { id: key };
    }
    const head = await s3.headObject({ Bucket, Key: key }).promise();
    await updateObjectsStatus([key], head ? "VERIFIED" : "ERROR");
    return { id: key };
  };
