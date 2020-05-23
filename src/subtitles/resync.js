import { secondsToSrtTime, srtTimeToSeconds, withoutMs } from "./index";

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
