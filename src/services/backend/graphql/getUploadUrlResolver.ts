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
  const entry = await prisma.entry.findUnique({
    where: {
      pageName: keyPrefix,
    },
  });
  if (!entry) throw new AuthenticationError("permission denied");
  const key = `${keyPrefix}/${entry.id}/${keySuffix}`;
  const url = `${keyPrefix}/${keySuffix}`;

  const uploadURL = await s3.getSignedUrlPromise("putObject", {
    Bucket,
    Key: key,
    ContentType: contentType,
    Expires: 30,
  });
  if (!uploadURL) throw new AuthenticationError("permission denied");

  const imageObject = {
    key,
    url,
    contentType,
    width,
    height,
    size,
  };
  console.log(
    await prisma.entry.update({
      where: {
        id: entry.id,
      },
      data: {
        directory: {
          upsert: {
            update: {
              keyPrefix: `${keyPrefix}/${entry.id}`,
              imageObjects: {
                create: [imageObject],
              },
            },
            create: {
              keyPrefix: `${keyPrefix}/${entry.id}`,
              imageObjects: {
                create: [imageObject],
              },
            },
          },
        },
      },
    })
  );

  return {
    uploadURL,
    url,
  };
};
