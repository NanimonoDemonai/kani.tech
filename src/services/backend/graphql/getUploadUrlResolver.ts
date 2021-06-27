import { Bucket } from "../../../constants/s3Bucket";
import { QueryResolvers } from "../../../types/generated/graphqlCodeGen";
import { prisma } from "../client/PrismClient";
import { s3 } from "../client/S3";
import { AuthenticationError, isUser } from "./rootResolvers";

export const getUploadUrlResolver: QueryResolvers["getUploadUrl"] = async (
  parent,
  { input: { keyPrefix, contentType, size, width, height, keySuffix } },
  context
) => {
  isUser(context);

  const key = `${keyPrefix}/${keySuffix}`;
  const res = await s3.getSignedUrlPromise("putObject", {
    Bucket,
    Key: key,
    ContentType: contentType,
    Expires: 30,
  });
  if (!res) throw new AuthenticationError("permission denied");

  const imageObjects = {
    create: {
      key,
      contentType,
      width,
      height,
      size,
    },
  };
  await prisma.objectDirectory.upsert({
    where: {
      keyPrefix,
    },
    create: {
      keyPrefix,
      imageObjects,
    },
    update: {
      imageObjects,
    },
  });
  return res;
};
