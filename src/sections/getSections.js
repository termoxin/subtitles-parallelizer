import { getTranscript } from "../transcript/getTranscript";

export const getSections = (settings) => {
  const {
    start,
    end,
    firstSubtitles,
    secondSubtitles,
    firstSubtitlesSplitter = "\r\n",
    secondSubtitlesSplitter = "\n",
  } = settings;

  const firstSubtitlesTranscript = getTranscript(
    firstSubtitles,
    start,
    end,
    firstSubtitlesSplitter
  );

  const secondSubtitlesTranscript = getTranscript(
    secondSubtitles,
    start,
    end,
    secondSubtitlesSplitter
  );

  return [firstSubtitlesTranscript, secondSubtitlesTranscript];
};
