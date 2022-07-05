import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { createMedium, decorate, getMaxDispalyWidth } from "./main.ts";

Deno.test("decorate", () => {
  const testCases = [
    { str: "突然の死", expected: ["＿人人人人人人＿", "＞　突然の死　＜", "￣Y^Y^Y^Y^Y^Y^Y￣"] },
    {
      str: "hello 世界",
      expected: ["＿人人人人人人人＿", "＞　hello 世界　＜", "￣Y^Y^Y^Y^Y^Y^Y^Y￣"],
    },
    {
      str: "👨‍👩‍👧‍👦 😄",
      expected: ["＿人人人人人＿", "＞　👨‍👩‍👧‍👦 😄　＜", "￣Y^Y^Y^Y^Y^Y￣"],
    },
    {
      str: "hello 世界\\r\\nhello vim\\rhello denops\\nhello vimscript",
      expected: [
        "＿人人人人人人人人人人＿",
        "＞　hello 世界     　＜",
        "＞　hello vim      　＜",
        "＞　hello denops   　＜",
        "＞　hello vimscript　＜",
        "￣Y^Y^Y^Y^Y^Y^Y^Y^Y^Y^Y￣",
      ],
    },
  ];

  testCases.forEach((tc) => {
    const actual = decorate(tc.str);
    assertEquals(actual, tc.expected);
  });
});

Deno.test("getMaxDispalyWidth", () => {
  const texts = ["hello", "vim"];
  const actual = getMaxDispalyWidth(texts);
  assertEquals(actual, 5);
});

Deno.test("createMedium", () => {
  const testCases = [
    {
      name: "表示幅の差が偶数",
      text: "hello",
      maxDisplayWidth: 7,
      expected: "＞　hello  　＜",
    },
    { text: "denops", maxDisplayWidth: 7, expected: "＞　denops 　＜" },
  ];

  testCases.forEach((tc) => {
    const actual = createMedium(tc.text, tc.maxDisplayWidth);
    assertEquals(actual, tc.expected);
  });
});
