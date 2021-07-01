export const revalidate = 3600;
export const uploaderTimeout = 10;
export const DocumentBucket: string =
  process.env.AWS_S3_DOCUMENT_BUCKET || "defaultDocumentBucket";
