import { srtTimeToSeconds } from "../src";

describe("time helpers", () => {
  test("should return seconds from string", () => {
    expect(srtTimeToSeconds("00:01:30,000")).toBe(90);
  });
});
