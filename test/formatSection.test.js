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

test("should format complicated string and return formatted one", () => {
  const textSection = `You haven't gone
to visit Dad yet?
We're taking things one
step at a time, girl.
If we don't visit, how are
we supposed to forgive him?
What are you talking about?
Elizabeth, at the farm, they taught us
forgiveness is the most valuable gift.
If we don't absolve him, we
become what he was. Full of hate.
My babies deserve a mother
who's better than that.
`;

  const formattedTextSection = `You haven't gone to visit Dad yet?
We're taking things one step at a time, girl.
If we don't visit, how are we supposed to forgive him?
What are you talking about?
Elizabeth, at the farm, they taught us forgiveness is the most valuable gift.
If we don't absolve him, we become what he was. Full of hate.
My babies deserve a mother who's better than that.`;

  expect(formatSection(textSection)).toEqual(formattedTextSection.trim());
});
