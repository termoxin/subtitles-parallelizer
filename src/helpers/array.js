export const getBetweenBy = (arr, from, to, key) => {
  const sections = [];

  arr.forEach((v) => {
    if (v[key] >= from && v[key] <= to) {
      sections.push(v);
    }
  });

  return sections;
};

export const glueStringsBy = (arr, key, joiner = "\n") =>
  arr.map((v) => v[key]).join(joiner);
