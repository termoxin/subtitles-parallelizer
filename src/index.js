import path from "path";

import { getFileContent } from "./helpers/filesystem";
import { getSections } from "./helpers/subtitles";
import { glueStringsBy } from "./helpers/array";

const [start, end] = process.argv.slice(2);

const run = async () => {
  const [en, ru] = await Promise.all([
    getFileContent(path.resolve(__dirname, "../en.srt")),
    getFileContent(path.resolve(__dirname, "../ru.srt")),
  ]);

  const [englishTranscript, russianTranscript] = getSections({
    start,
    end,
    firstLang: en,
    secondLang: ru,
    secondLangSplitter: "\r\n",
  });

  console.log(
    `${glueStringsBy(englishTranscript, "content")}\n\n${glueStringsBy(
      russianTranscript,
      "content"
    )}`
  );
};

run();
