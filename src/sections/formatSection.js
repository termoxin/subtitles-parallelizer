const BREAK_LINE = "\n";
const COMMA = ",";
const DOT = ".";

const getLast = (arr) => arr.slice(-1)[0];
const shallowEqual = (a, b) => a === b;
const isTrue = (value) => !!value && value.trim();
const getNext = (arr, currentIndex) => arr[currentIndex + 1];
const isLetter = (str) => str.length === 1 && str.match(/[a-z]/i);

const isNumberOrLetterRegexp = new RegExp("[A-Za-z0-9]", "gi");
const isNumberOrLetter = (str) => isNumberOrLetterRegexp.test(str);

export const formatSection = (text) => {
  const lines = text.split(BREAK_LINE).filter(isTrue);
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const nextLine = getNext(lines, i);
    const lastChar = getLast(line);

    if (
      !shallowEqual(lastChar, DOT) &&
      lastChar === lastChar.toLowerCase() &&
      isLetter(lastChar)
    ) {
      newLines.push(line + " " + nextLine?.trim() || "");
      i++;
    } else if (
      (nextLine && lastChar && shallowEqual(lastChar, COMMA)) ||
      isNumberOrLetter(lastChar)
    ) {
      newLines.push(line + " " + nextLine?.trim() || "");
      i++;
    } else {
      newLines.push(line);
    }
  }

  return newLines.join("\n").trim();
};
