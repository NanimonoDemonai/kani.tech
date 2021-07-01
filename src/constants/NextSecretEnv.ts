export const revalidate = process.env.PAGE_REVALIDATE_TIME || 3600;
export const uploaderTimeout = process.env.PAGE_UPLOADER_TIMEOUT_MIN || 10;
export const DocumentBucket: string =
  process.env.AWS_S3_DOCUMENT_BUCKET || "defaultDocumentBucket";
