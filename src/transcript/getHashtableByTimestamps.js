import { keyBy } from "../helpers/general/object";
import { splitOnSections } from "../sections/splitOnSections";

export const getHashtableByTimestamps = (text, splitter) => {
  const sections = splitOnSections(text, splitter);

  const hastableStart = keyBy(sections, "startTime");
  const hashtableEnd = keyBy(sections, "endTime");

  return [hastableStart, hashtableEnd];
};
