import { keyBy } from "../helpers/general/object";
import { parse } from "./parse";

export const getHashtableByTimestamps = (text) => {
  const sections = parse(text);

  const hastableStart = keyBy(sections, "startTime");
  const hashtableEnd = keyBy(sections, "endTime");

  return [hastableStart, hashtableEnd];
};
