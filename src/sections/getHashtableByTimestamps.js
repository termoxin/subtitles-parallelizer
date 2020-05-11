import { keyBy } from "../helpers/general/object";
import { splitOnSections } from "./parse";

export const getHashtableByTimestamps = (text) => {
  const sections = splitOnSections(text);

  const hastableStart = keyBy(sections, "startTime");
  const hashtableEnd = keyBy(sections, "endTime");

  return [hastableStart, hashtableEnd];
};
