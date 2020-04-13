import path from "path";
import { getFileContent } from "./helpers/filesystem";
import { getSections } from "./helpers/subtitles";
import { glueStringsBy } from "./helpers/array";

const [start, end] = process.argv.slice(2);

const run = async () => {
  const enSubtitles = getFileContent(path.resolve(__dirname, "../en.srt"));
  const ruSubtitles = getFileContent(path.resolve(__dirname, "../ru.srt"));

  const [en, ru] = await Promise.all([enSubtitles, ruSubtitles]);

  const [englishTranscript, russianTranscript] = getSections({
    engText: en,
    ruText: ru,
    start,
    end,
  });

  console.log(
    `${glueStringsBy(englishTranscript, "content")}\n\n${glueStringsBy(
      russianTranscript,
      "content"
    )}`
  );
};

run();
