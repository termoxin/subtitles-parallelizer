import { stripTags } from "../helpers/string";
import { keyBy } from "../helpers/object";
import { getBetweenBy } from "../helpers/array";

export const withoutMs = (timestamp) => {
  return timestamp.split(",")[0].replace(" ", "").trim();
};

export const createObjectSection = (section) => {
  const [id, timestamp, ...content] = section.split("\n").filter(Boolean);

  if (timestamp) {
    const [start, end] = timestamp.split("-->");
    const joinedContent = content.join("\n");

    if (start && end) {
      return {
        id: +id,
        startTime: withoutMs(start),
        endTime: withoutMs(end),
        startTimeWithMs: start.trim(),
        endTimeWithMs: end.trim(),
        content: joinedContent.replace(/- /g, "").trim(),
      };
    }

    return false;
  }

  return false;
};

export const splitOnObjectSections = (text, splitter = "\r\n") => {
  if (!text) {
    throw new Error(
      "Please, provide the first argument (subtitles to split on sections)"
    );
  }

  const sections = [];

  let previousIndex = 0;

  const textSections = text.split(splitter);

  if (textSections.length === 1) {
    return [createObjectSection(textSections[0])];
  }

  textSections.forEach((line, index, array) => {
    if (line === "" || line === "\r") {
      const section = array.slice(previousIndex, index).join("\n");

      if (section) {
        const createdSection = createObjectSection(section);

        if (createdSection) {
          sections.push(createObjectSection(section, index));
          previousIndex = index;
        }
      }
    }
  });

  return sections;
};

export const getSectionsByWord = (name, text, splitter = "\r\n") => {
  return splitOnSections(text, splitter).filter(
    (value) => value.content.indexOf(name) > -1
  );
};

export const createPreviousAndNextSec = (time) => {
  const [h, m, s] = time.split(":");

  const previousSec = `${h}:${m}:${s - 1}`;
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
  const {
    start,
    end,
    firstLanguage,
    secondLanguage,
    firstLanguageSplitter = "\r\n",
    secondLanguageSplitter = "\n",
  } = settings;

  const firstLanguageTranscript = getTranscript(
    firstLanguage,
    start,
    end,
    firstLanguageSplitter
  );

  const secondLanguageTranscript = getTranscript(
    secondLanguage,
    start,
    end,
    secondLanguageSplitter
  );

  return [firstLanguageTranscript, secondLanguageTranscript];
};
