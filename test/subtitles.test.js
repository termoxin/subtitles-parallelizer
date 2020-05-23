import {
  unresyncedSubtitles,
  resyncedSubtitles,
  firstSubtitles,
  secondSubtitles,
} from "./fixtures/subtitles";

import {
  srtTimeToSeconds,
  secondsToSrtTime,
  withoutMs,
  createPreviousAndNextSec,
} from "../src/subtitles";

import { resync } from "../src/subtitles/resync";

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

  test("should return resynced subtitles", () => {
    expect(resync(unresyncedSubtitles, 2000)).toEqual(resyncedSubtitles);
  });

  test("should return subtitles with resynced timestamps", () => {
    const [firstSection, secondSection] = resync(firstSubtitles, -10000);

    const {
      startTime: startTimeFirstSectionFirstSubtitles,
      endTime: endTimeFirstSectionFirstSubtitles,
    } = firstSection;

    const {
      startTime: startTimeFirstSectionSecondSubtitles,
      endTime: endTimeFirstSectionSecondSubtitles,
    } = secondSubtitles[0];

    expect(startTimeFirstSectionFirstSubtitles).toBe(
      startTimeFirstSectionSecondSubtitles
    );

    expect(endTimeFirstSectionFirstSubtitles).toBe(
      endTimeFirstSectionSecondSubtitles
    );

    expect(secondSection.startTime).toBe(secondSubtitles[1].startTime);
    expect(secondSection.endTime).toBe(secondSubtitles[1].endTime);

    expect(secondSection.startTimeWithMs).toBe(
      secondSubtitles[1].startTimeWithMs
    );

    expect(secondSection.endTimeWithMs).toBe(secondSubtitles[1].endTimeWithMs);
  });
});
