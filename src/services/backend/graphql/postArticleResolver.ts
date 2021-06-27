import { MutationResolvers } from "../../../types/generated/graphqlCodeGen";
import { frontMatterStringify } from "../../../utils/parsers/FrontMatterParser";
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
  await createOrUpsertEntry({ tags, source: data, pageName, pageTitle });
  return { id: "1" };
};
