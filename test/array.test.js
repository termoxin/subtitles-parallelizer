import { joinStringsBy } from "../src/helpers/general/array";
import { arrayToJoin, arrayToJoinResult } from "./fixtures/array";

describe("string helpers", () => {
  test("should return joined string", () => {
    expect(joinStringsBy(arrayToJoin, "name")).toBe(arrayToJoinResult);
  });
});
