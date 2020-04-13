import { stripTags } from "../helpers/string";
import { keyBy } from "../helpers/object";
import { getBetweenBy } from "../helpers/array";

export const withoutMs = (timestamp) =>
  timestamp.split(",")[0].replace(" ", "");

export const createObjectSection = (section) => {
  const [id, timestamp, ...content] = section.split("\n").filter(Boolean);
  const [start, end] = timestamp.split("-->");
  const joinedContent = content.join("\n");

  return {
    id: +id,
    startTime: withoutMs(start),
    endTime: withoutMs(end),
    content: joinedContent.replace(/- /g, "").trim(),
  };
};

export const splitOnObjectSections = (text, splitter = "\r\n") => {
  if (!text) {
    throw new Error(
      "Please, provide the first argument (subtitles to split on sections)"
    );
  }

  const sections = [];

  let previousIndex = 0;

  text.split(splitter).forEach((line, index, array) => {
    if (line === "") {
      const section = array.slice(previousIndex, index).join("\n");

      sections.push(createObjectSection(section, index));
      previousIndex = index;
    }
  });

  return sections;
};

export const getSections = (settings) => {
  const { engText, ruText, start, end } = settings;

  const strippedRuText = stripTags(ruText);
  const strippedEngText = stripTags(engText);

  const first = splitOnObjectSections(strippedEngText);
  const second = splitOnObjectSections(strippedRuText, "\n");

  const hastableStartEn = keyBy(first, "startTime");
  const hashtableEndEn = keyBy(first, "endTime");

  const hastableStartRu = keyBy(second, "startTime");
  const hashtableEndRu = keyBy(second, "endTime");

  const fromEn = hastableStartEn[start].id;
  const toEn = hashtableEndEn[end].id;

  // from
  const [h, m, s] = start.split(":");

  const previousSec = `${h}:${m}:${+s - 1}`;
  const nextSec = `${h}:${m}:${+s + 1}`;

  const fromRu = (
    hastableStartRu[previousSec] ||
    hastableStartRu[start] ||
    hastableStartRu[nextSec]
  ).id;

  // to
  const [hEnd, mEnd, sEnd] = end.split(":");

  const previousSecEnd = `${hEnd}:${mEnd}:${+sEnd - 1}`;
  const nextSecEnd = `${hEnd}:${mEnd}:${+sEnd + 1}`;

  const toRu = (
    hashtableEndRu[previousSecEnd] ||
    hashtableEndRu[end] ||
    hashtableEndRu[nextSecEnd]
  ).id;

  const englishTranscript = getBetweenBy(first, fromEn, toEn, "id");
  const russianTranscript = getBetweenBy(second, fromRu, toRu, "id");

  return [englishTranscript, russianTranscript];
};
