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

const createPreviousAndNextSec = (time) => {
  const [h, m, s] = time.split(":");

  const previousSec = `${h}:${m}:${+s - 1}`;
  const nextSec = `${h}:${m}:${+s + 1}`;

  return [previousSec, nextSec];
};

const splitOnSections = (text, splitter) => {
  const strippedText = stripTags(text);
  const sections = splitOnObjectSections(strippedText, splitter);

  return sections;
};

const getHashtableByTimestamps = (text, splitter) => {
  const sections = splitOnSections(text, splitter);

  const hastableStart = keyBy(sections, "startTime");
  const hashtableEnd = keyBy(sections, "endTime");

  return [hastableStart, hashtableEnd];
};

const getTranscript = (text, start, end, splitter) => {
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

export const getSections = (settings) => {
  const { engText: en, ruText: ru, start, end } = settings;

  const englishTranscript = getTranscript(en, start, end);
  const russianTranscript = getTranscript(ru, start, end, "\n");

  return [englishTranscript, russianTranscript];
};
