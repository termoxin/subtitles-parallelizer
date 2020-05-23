const hoursToSeconds = (hours) => hours * 60 * 60;
const minutesToSeconds = (minutes) => minutes * 60;
const millisecondsToSeconds = (ms) => ms / 1000;

/**
 * The function takes time in srt format (such as 00:01:00,200) and returns seconds
 * @param time srt time to convert in seconds
 *
 * @example
 * ```js
 *  srtTimeToSecond("00:01:30,000") // 90
 * ```
 */

export const srtTimeToSeconds = (time) => {
  const [h, m, s] = time.split(":");
  const [sec, ms] = s.split(",");

  const [hours, minutes, seconds, milliseconds] = [h, m, sec, ms].map(Number);

  return [
    hoursToSeconds(hours),
    minutesToSeconds(minutes),
    seconds,
    millisecondsToSeconds(milliseconds),
  ].reduce((acc, v) => acc + v);
};

/**
 * The function is the opposite of the srtTimeToSeconds function
 * it takes time in seconds and returns a string in srt time format
 * @param seconds convert seconds into srt time format
 *
 * @example
 * ```js
 *  secondsToSrtTime(90) // "00:01:30,000"
 * ```
 */

export const secondsToSrtTime = (seconds) =>
  `${new Date(seconds * 1000).toISOString().substr(11, 12)}`.replace(".", ",");

export const withoutMs = (timestamp) =>
  timestamp
    .split(",")[0]
    .replace(" ", "")
    .trim();

export const createPreviousAndNextSec = (time) => {
  const [h, m, s] = time.split(":");

  const previousSec = `${h}:${m}:${s - 1}`;
  const nextSec = `${h}:${m}:${+s + 1}`;

  return [previousSec, nextSec];
};
