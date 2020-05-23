import { parse } from "./parse";

/**
 * The function takes name and subtitles text to find a word or a phrase in each section's content of the subtitles
 *
 * @param name A word or phrase to find
 * @param text The text to parse
 *
 * @returns the same array of objects as like ``parse`` function does
 */

export const parseByName = (name, text) =>
  parse(text).filter((value) => value.content.indexOf(name) > -1);
