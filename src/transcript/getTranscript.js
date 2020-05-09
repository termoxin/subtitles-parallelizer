import { getBetweenBy } from "../helpers/general/array";
import { splitOnSections } from "../sections/splitOnSections";
import { getHashtableByTimestamps } from "./getHashtableByTimestamps";
import { createPreviousAndNextSec } from "../subtitles";

export const getTranscript = (text, start, end, splitter) => {
  const sections = splitOnSections(text, splitter);

  const [hastableStart, hashtableEnd] = getHashtableByTimestamps(
    text,
    splitter
  );

  const [previousSec, nextSec] = createPreviousAndNextSec(start);
  const [previousSecEnd, nextSecEnd] = createPreviousAndNextSec(end);

  const from = (
    hastableStart[start] ||
    hastableStart[previousSec] ||
    hastableStart[nextSec]
  ).id;

  const to = (
    hashtableEnd[end] ||
    hashtableEnd[previousSecEnd] ||
    hashtableEnd[nextSecEnd]
  ).id;

  return getBetweenBy(sections, from, to, "id");
};
