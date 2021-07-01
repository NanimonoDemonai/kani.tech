export const revalidate: number =
  Number(process.env.PAGE_REVALIDATE_TIME) || 3600;
export const uploaderTimeout: number =
  Number(process.env.PAGE_UPLOADER_TIMEOUT_MIN) || 10;
export const DocumentBucket: string =
  process.env.AWS_S3_DOCUMENT_BUCKET || "defaultDocumentBucket";
