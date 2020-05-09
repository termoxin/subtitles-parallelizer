import { srtTimeToSeconds, secondsToSrtTime } from "../src/subtitles";

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
});
