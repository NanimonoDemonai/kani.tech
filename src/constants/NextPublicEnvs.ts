export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "kani.tech";
export const CODE_REPOSITORY = new URL(
  process.env.NEXT_PUBLIC_CODE_REPOSITORY ||
    "https://github.com/NanimonoDemonai/kani.tech"
);
export const Bucket: string =
  process.env.NEXT_PUBLIC_AWS_S3_BUCKET || "defaultBucket";
