import { gqlClient } from "./client/graphqlRequest";

const getImageSize = async (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const size = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
      URL.revokeObjectURL(img.src);
      resolve(size);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = URL.createObjectURL(file);
  });
};

export const uploadImage = async (
  file: File,
  keyPrefix: string
): Promise<string | void> => {
  const { name: keySuffix, size, type: contentType } = file;
  const { width, height } = await getImageSize(file);
  const { getUploadUrl: url } = await gqlClient.GetUploadUrl({
    input: {
      contentType,
      keySuffix,
      keyPrefix,
      width,
      height,
      size,
    },
  });
  if (!url) return;

  await fetch(url, {
    method: "put",
    body: file,
    headers: {
      "Content-Type": file.type,
      "x-amz-meta-width": `${width}`,
      "x-amz-meta-height": `${height}`,
    },
  });
  return `${keyPrefix}/${keySuffix}`;
};
