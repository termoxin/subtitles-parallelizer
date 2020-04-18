const hoursToSeconds = (hours) => hours * 60 * 60;
const minutesToSeconds = (minutes) => minutes * 60;
const millisecondsToSeconds = (ms) => ms / 1000;

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
