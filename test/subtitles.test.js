import {
  withoutMs,
  createObjectSection,
  createPreviousAndNextSec,
  getSections,
  getSectionsByWord,
} from "../src/helpers/subtitles";

const firstTextSection = `2
00:00:28,500 --> 00:00:31,461
<i>a lot of text</i>`;

const secondTextSection = `2
00:00:28,500 --> 00:00:31,461
<i>много текста</i>`;

describe("subtitle helpers", () => {
  test("should return timestamp without milliseconds", () => {
    expect(withoutMs("00:01:30,100")).toBe("00:01:30");
  });

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

  test("should return next and previous second timestamp", () => {
    expect(createPreviousAndNextSec("00:00:28")).toStrictEqual([
      "00:00:27",
      "00:00:29",
    ]);
  });

  test("should return section from string", () => {
    const config = {
      start: "00:00:28",
      end: "00:00:31",
      firstLanguage: firstTextSection,
      secondLanguage: secondTextSection,
      secondLanguageSplitter: "\r\n",
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
          content: "много текста",
          endTime: "00:00:31",
          endTimeWithMs: "00:00:31,461",
          id: 2,
          startTime: "00:00:28",
          startTimeWithMs: "00:00:28,500",
        },
      ],
    ];

    expect(getSections(config)).toStrictEqual(result);
  });

  test("should return sections by phrase or word", () => {
    const output = [
      {
        content: "a lot of text",
        endTime: "00:00:31",
        endTimeWithMs: "00:00:31,461",
        id: 2,
        startTime: "00:00:28",
        startTimeWithMs: "00:00:28,500",
      },
    ];

    expect(getSectionsByWord("text", firstTextSection)).toStrictEqual(output);
  });
});
