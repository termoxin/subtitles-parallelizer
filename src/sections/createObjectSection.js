import { withoutMs } from "../subtitles";

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
