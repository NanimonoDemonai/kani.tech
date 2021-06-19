import { getEntryPathWithEntryName } from "./getURL";

describe("getURL", function () {
  it("should getEntryPathWithEntryName", function () {
    expect(getEntryPathWithEntryName("test")).toBe("/entries/test");
  });
});
