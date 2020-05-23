import { secondsToSrtTime, srtTimeToSeconds, withoutMs } from "./index";

/**
 * The function resynchonizes subtitles
 *
 * @param subtitles - array of objects that ``parse`` function produces
 * @param time - offset time (you can use negative value for flexibity)
 *
 * @example
 * ```js
 *
  * const unresyncedSubtitles = [
      {
        id: 1,
        content: "a lot of text",
        startTime: "00:00:26",
        endTime: "00:00:29",
        startTimeWithMs: "00:00:26,500",
        endTimeWithMs: "00:00:29,461",
      },
      {
        id: 2,
        content: "a lot of text",
        startTime: "00:00:29",
        endTime: "00:00:36",
        startTimeWithMs: "00:00:29,500",
        endTimeWithMs: "00:00:36,461",
      },
  ];

 *
 * resync(unresyncedSubtitles, 2000)
 * ```
 */

export const resync = (subtitles, time) =>
  subtitles.map(({ startTimeWithMs, endTimeWithMs, ...props }) => {
    const resyncedStartTimeWithMs = secondsToSrtTime(
      srtTimeToSeconds(startTimeWithMs) + time / 1000
    );

    const resyncedEndTimeWithMs = secondsToSrtTime(
      srtTimeToSeconds(endTimeWithMs) + time / 1000
    );

    return {
      ...props,
      startTimeWithMs: resyncedStartTimeWithMs,
      endTimeWithMs: resyncedEndTimeWithMs,
      startTime: withoutMs(resyncedStartTimeWithMs),
      endTime: withoutMs(resyncedEndTimeWithMs),
    };
  });
