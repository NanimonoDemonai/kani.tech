import { gqlClient } from "./client/graphqlRequest";

export const uploadImage = async (
  file: File,
  pageName: string
): Promise<string | void> => {
  const key = `${pageName}/${file.name}`;
  const { getUploadUrl: url } = await gqlClient.GetUploadUrl({
    contentType: file.type,
    key,
  });
  if (!url) return;
  await fetch(url, {
    method: "put",
    body: file,
    headers: { "Content-Type": file.type },
  });
  return key;
};
