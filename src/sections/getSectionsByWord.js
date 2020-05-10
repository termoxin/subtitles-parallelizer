import { splitOnSections } from "./splitOnSections";

export const getSectionsByWord = (name, text) =>
  splitOnSections(text).filter((value) => value.content.indexOf(name) > -1);
