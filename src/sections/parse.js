import { compose } from "ramda";
import { stripTags } from "../helpers/general/string";
import { splitOnObjectSections } from "./splitOnObjectSections";

/**
 * The function takes subtitles in srt format and returns sections as array of objects
 * @param text - subtitles text to parse into array of objects
 *
 * @example
 * ```js
 *  const subtitles = `
 *  1
    00:00:01,000 --> 00:00:05,000
    Subtitle 1.1
    Subtitle 1.2
    `
 *  parse(subtitles)
 *
 *  // output
 *  [
      {
        id: 1,
        startTime: '00:00:01',
        endTime: '00:00:05',
        startTimeWithMs: '00:00:01,000',
        endTimeWithMs: '00:00:05,000',
        content: 'Subtitle 1.1\nSubtitle 1.2'
      },
    ]
 * ```
 */

export const parse = compose(splitOnObjectSections, stripTags);
