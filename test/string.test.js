import { stripTags } from "../src/helpers/string";

describe("string helpers", () => {
  test("should strip html tags", () => {
    expect(stripTags("<i>word</i>")).toBe("word");
  });
});
