export const Bucket: string =
  process.env.NEXT_PUBLIC_AWS_S3_BUCKET || "defaultBucket";

export const DocumentBucket: string =
  process.env.AWS_S3_DOCUMENT_BUCKET || "defaultDocumentBucket";
