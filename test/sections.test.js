import { parseBoth } from "../src/sections/parseBoth";
import { createObjectSection } from "../src/sections/createObjectSection";
import { parseByName } from "../src/sections/parseByName";
import { parse } from "../src/sections/parse";
import {
  subtitlesWithNewLine,
  subtitlesWithCarriage,
  sectionsFromSubtitles,
  subtitlesForOffset,
} from "./fixtures/sections";

const firstTextSection = `2
00:00:28,500 --> 00:00:31,461
<i>a lot of text</i>`;

const secondTextSection = `2
00:00:28,500 --> 00:00:31,461
<i>много текста</i>`;

describe("subtitle helpers", () => {
  test("should return valid section object", () => {
    const objectSection = {
      id: 2,
      content: "<i>a lot of text</i>",
      endTime: "00:00:31",
      endTimeWithMs: "00:00:31,461",
      startTime: "00:00:28",
      startTimeWithMs: "00:00:28,500",
    };

    expect(createObjectSection(firstTextSection)).toStrictEqual(objectSection);
  });

  test("should return section from string", () => {
    const config = {
      start: "00:00:28",
      end: "00:00:31",
      firstSubtitles: firstTextSection,
      secondSubtitles: secondTextSection,
    };

    const result = [
      [
        {
          content: "a lot of text",
          endTime: "00:00:31",
          endTimeWithMs: "00:00:31,461",
          id: 2,
          startTime: "00:00:28",
          startTimeWithMs: "00:00:28,500",
        },
      ],
      [
        {
          id: 2,
          content: "много текста",
          endTime: "00:00:31",
          endTimeWithMs: "00:00:31,461",
          startTime: "00:00:28",
          startTimeWithMs: "00:00:28,500",
        },
      ],
    ];

    expect(parseBoth(config)).toStrictEqual(result);
  });

  test("should return sections by phrase or word and shouldn't be letter case sensitive", () => {
    const output = [
      {
        id: 2,
        content: "a lot of text",
        endTime: "00:00:31",
        endTimeWithMs: "00:00:31,461",
        startTime: "00:00:28",
        startTimeWithMs: "00:00:28,500",
      },
    ];

    expect(parseByName("text", firstTextSection)).toStrictEqual(output);
    expect(parseByName("Text", firstTextSection)).toStrictEqual(output);
    expect(parseByName("Text", firstTextSection)).toHaveLength(1);
  });

  test("should return sections by phrase or word with offset", () => {
    const output = [
      {
        id: 1,
        startTime: "00:00:01",
        endTime: "00:00:05",
        startTimeWithMs: "00:00:01,000",
        endTimeWithMs: "00:00:05,000",
        content:
          "She saw no irony asking me to change  but wanting me to accept her for who she is.\n" +
          "Subtitle 1.2",
      },
      {
        id: 2,
        startTime: "00:00:30",
        endTime: "00:35:00",
        startTimeWithMs: "00:00:30,500",
        endTimeWithMs: "00:35:00,000",
        content:
          "Each person who knows you has a\n" +
          "different perception of who you are\n" +
          "Subtitle 1.2",
      },
      {
        id: 3,
        startTime: "00:36:00",
        endTime: "00:40:05",
        startTimeWithMs: "00:36:00,000",
        endTimeWithMs: "00:40:05,000",
        content:
          "She had some amazing news to share but nobody to share it with.\n" +
          "Subtitle 1.2",
      },
    ];

    expect(
      parseByName("Each person", subtitlesForOffset, { left: 1, right: 1 })
    ).toEqual(output);
  });

  test("should return sections", () => {
    expect(parse(subtitlesWithCarriage)).toEqual(sectionsFromSubtitles);

    expect(parse(subtitlesWithNewLine)).toEqual(sectionsFromSubtitles);
  });
});
