import {
  srtTimeToSeconds,
  secondsToSrtTime,
  withoutMs,
  createPreviousAndNextSec,
} from "../src/subtitles";

describe("time helpers", () => {
  test("should return seconds from string", () => {
    expect(srtTimeToSeconds("00:01:30,000")).toBe(90);
  });

  test("should return string from secord", () => {
    const seconds1 = srtTimeToSeconds("00:01:30,000");
    const seconds2 = srtTimeToSeconds("00:01:30,002");
    const seconds3 = srtTimeToSeconds("00:01:30,200");

    expect(secondsToSrtTime(seconds1)).toBe("00:01:30,000");
    expect(secondsToSrtTime(seconds2)).toBe("00:01:30,002");
    expect(secondsToSrtTime(seconds3)).toBe("00:01:30,200");
  });

  test("should return timestamp without milliseconds", () => {
    expect(withoutMs("00:01:30,100")).toBe("00:01:30");
  });

  test("should return next and previous second timestamp", () => {
    expect(createPreviousAndNextSec("00:00:28")).toStrictEqual([
      "00:00:27",
      "00:00:29",
    ]);
  });
});
