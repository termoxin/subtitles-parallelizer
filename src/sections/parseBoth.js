import { parse } from "./parse";

/**
 * The function takes settings and return two parallelized subtitles
 * (for instance, to parallelize two different subtitles in different languages)
 *
 * @param settings Settings to parallelize two subtitles.
 * @param settings.start The start time in the each subttles file.
 * @param settings.end The end time in the each subtitles file.
 * @param settings.firstSubtitles The first subtitles text
 * @param settings.secondSubtitles The second subtitles text
 *
 * @returns the tuple (array with two items), where items are the data structures of the same output
 * as the ``parse`` function returns
 */

export const parseBoth = (settings) => {
  const { start, end, firstSubtitles, secondSubtitles } = settings;

  const firstSubtitlesTranscript = parse(firstSubtitles, start, end);
  const secondSubtitlesTranscript = parse(secondSubtitles, start, end);

  return [firstSubtitlesTranscript, secondSubtitlesTranscript];
};
