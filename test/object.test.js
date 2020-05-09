import { keyBy } from "../src/helpers/general/object";

describe("object helpers", () => {
  test("should return object by keys", () => {
    const input = [
      {
        id: 1,
        name: "Word",
      },
    ];

    const output = {
      1: {
        id: 1,
        name: "Word",
      },
    };

    expect(keyBy(input, "id")).toStrictEqual(output);
  });
});
