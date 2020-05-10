import { getTranscript } from "../transcript/getTranscript";

export const getSections = (settings) => {
  const { start, end, firstSubtitles, secondSubtitles } = settings;

  const firstSubtitlesTranscript = getTranscript(firstSubtitles, start, end);

  const secondSubtitlesTranscript = getTranscript(secondSubtitles, start, end);

  return [firstSubtitlesTranscript, secondSubtitlesTranscript];
};
