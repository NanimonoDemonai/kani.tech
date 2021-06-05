import {
  getEntryMdxPathWithEntryName,
  getEntryPathWithEntryName,
} from "./getURL";

describe("getURL", function () {
  it("should getEntryPathWithEntryName", function () {
    expect(getEntryPathWithEntryName("test")).toBe("/entries/test");
  });
  it("should getMdxEntryPathWithEntryName", function () {
    expect(getEntryMdxPathWithEntryName("test")).toBe("/entries/test/mdx");
  });
});
