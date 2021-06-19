export const getEntryPathWithEntryName = (entryName: string): string =>
  `/entries/${entryName}`;

export const getTaggedEntryListPathWithTagName = (tagName: string): string =>
  `/tag/${tagName}`;

export const getImageUrl = (key: string): string =>
  `http://localhost:8082/auto/plain/s3://example-space-name/${encodeURI(key)}`;
