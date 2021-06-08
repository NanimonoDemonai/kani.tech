export const getEntryPathWithEntryName = (entryName: string): string =>
  `/entries/${entryName}`;

export const getEntryMdxPathWithEntryName = (entryName: string): string =>
  `/entries/${entryName}/mdx`;

export const getTaggedEntryListPathWithTagName = (tagName: string): string =>
  `/tag/${tagName}`;
