import { getBetweenBy } from "../helpers/general/array";
import { splitOnSections } from "./parse";
import { getHashtableByTimestamps } from "./getHashtableByTimestamps";
import { createPreviousAndNextSec } from "../subtitles";

/**
 * The function takes subtitles text, start and end time to get sections between specific timestamps
 *
 * @param text The text to parse
 * @param start The start timestamp
 * @param end The end timestamp
 *
 * @returns the same array of objects as ``parse`` function does
 */

export const parseByTimestamp = (text, start, end) => {
  const sections = splitOnSections(text);

  const [hastableStart, hashtableEnd] = getHashtableByTimestamps(text);

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
