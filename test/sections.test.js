import { parseBoth } from "../src/sections/parseBoth";
import { createObjectSection } from "../src/sections/createObjectSection";
import { parseByName } from "../src/sections/parseByName";
import { parse } from "../src/sections/parse";
import {
  subtitlesWithNewLine,
  subtitlesWithCarriage,
  sectionsFromSubtitles,
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

  test("should return sections by phrase or word", () => {
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
  });

  test("should return sections", () => {
    expect(parse(subtitlesWithCarriage)).toEqual(sectionsFromSubtitles);

    expect(parse(subtitlesWithNewLine)).toEqual(sectionsFromSubtitles);
  });
});
