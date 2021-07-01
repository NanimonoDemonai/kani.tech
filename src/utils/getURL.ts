import { Bucket } from "../constants/NextPublicEnvs";

export const getEntryPathWithEntryName = (entryName: string): string =>
  `/entries/${entryName}`;

export const getTaggedEntryListPathWithTagName = (tagName: string): string =>
  `/tag/${tagName}`;

export const getImageUrl = (key: string): string =>
  `http://localhost:8082/auto/plain/s3://${Bucket}/${encodeURI(key)}`;

export const getOptimizedImageURL = (key: string, width: number): string =>
  `http://localhost:8082/rs:fit:${width}/plain/s3://${Bucket}/${encodeURI(
    key
  )}@webp`;
