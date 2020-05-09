import { splitOnSections } from "./splitOnSections";

export const getSectionsByWord = (name, text, splitter = "\r\n") =>
  splitOnSections(text)(splitter).filter(
    (value) => value.content.indexOf(name) > -1
  );
