import { parse } from "./parse";
import { getBetweenBy } from "../helpers/general/array";

/**
 * The function takes name and subtitles text to find a word or a phrase in each section's content of the subtitles
 * The function takes a third argument as offset object to widen array of objects left or right or both
 *
 * @param name A word or phrase to find
 * @param text The text to parse
 * @param offset {{left: number, right: number}} Offset configuration object
 *
 * @returns array of objects (sections) like ``parse`` function does
 */

export const parseByName = (name, text, offset) => {
  if (offset) {
    const parsedSubtitles = parse(text);

    const { id } = parsedSubtitles.filter((value) =>
      new RegExp(name, "gi").test(value.content)
    )[0];

    return getBetweenBy(
      parsedSubtitles,
      id - offset.left,
      id + offset.right,
      "id"
    );
  }

  return parse(text).filter((value) =>
    new RegExp(name, "gi").test(value.content)
  );
};
