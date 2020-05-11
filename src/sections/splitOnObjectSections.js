import { createObjectSection } from "./createObjectSection";

export const splitOnObjectSections = (text, splitter = "\n") => {
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

  if (sections.length <= 1) {
    return splitOnObjectSections(text, "\r\n");
  }

  return sections;
};
