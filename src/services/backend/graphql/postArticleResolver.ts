import { DocumentBucket } from "../../../constants/NextSecretEnv";
import { MutationResolvers } from "../../../types/generated/graphqlCodeGen";
import { frontMatterStringify } from "../../../utils/parsers/FrontMatterParser";
import { s3 } from "../client/S3";
import { createOrUpsertEntry } from "../createOrUpsertEntry";
import { isUser } from "./rootResolvers";

export const postArticleResolver: MutationResolvers["postArticle"] = async (
  parent,
  { input: { tags, source, pageName, pageTitle } },
  context
) => {
  isUser(context);
  const data =
    frontMatterStringify(source, {
      title: pageTitle,
      tags,
      disableSanitize: false,
    }) || "";
  const { id, revision } = await createOrUpsertEntry({
    tags,
    source: data,
    pageName,
    pageTitle,
  });
  await s3
    .upload({
      Bucket: DocumentBucket,
      Key: `${pageName}/${id}/${revision}.mdx`,
      Body: data,
      ContentType: "text/plain",
    })
    .promise();
  return { id: "1" };
};
