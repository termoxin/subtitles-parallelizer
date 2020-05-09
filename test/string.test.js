import { stripTags } from "../src/helpers/general/string";
import { joinStringsBy } from "../src/helpers/general/array";
import { arrayToJoin, arrayToJoinResult } from "./fixtures/string";

describe("string helpers", () => {
  test("should strip html tags", () => {
    expect(stripTags("<i>word</i>")).toBe("word");
  });

  test("should return joined string", () => {
    expect(joinStringsBy(arrayToJoin, "name")).toBe(arrayToJoinResult);
  });
});
