const { formatSection } = require("../src/sections/formatSection");

test("should return formatted string", () => {
  const textSection = `
    Stronger unpacked felicity
    to of mistaken. Fanny at wrong table ye in.
    Be on easily cannot innate in lasted months on.
    Differed and and
    felicity steepest mrs age outweigh.
    Opinions learning likewise daughter now age outweigh.
    Raptures stanhill my greatest
    mistaken or exercise he on although.
    Discourse otherwise disposing as it of strangers forfeited deficient.
  `;

  const formattedTextSection = `
    Stronger unpacked felicity to of mistaken. Fanny at wrong table ye in.
    Be on easily cannot innate in lasted months on.
    Differed and and felicity steepest mrs age outweigh.
    Opinions learning likewise daughter now age outweigh.
    Raptures stanhill my greatest mistaken or exercise he on although.
    Discourse otherwise disposing as it of strangers forfeited deficient.
  `;

  expect(formatSection(textSection)).toEqual(formattedTextSection.trim());
});
