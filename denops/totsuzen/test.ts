import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { decorate } from "./main.ts";
import stringWidth from "https://esm.sh/string-width";
import { round } from "https://deno.land/x/math@v1.1.0/mod.ts";

Deno.test("decorate", () => {
  const testCases = [
    { str: "突然の死", expected: ["＿人人人人人人＿", "＞　突然の死　＜", "￣Y^Y^Y^Y^Y^Y^Y￣"] },
    { str: "hello 世界", expected: ["＿人人人人人人人＿", "＞　hello 世界　＜", "￣Y^Y^Y^Y^Y^Y^Y^Y￣"] },
    { str: "👨‍👩‍👧‍👦 😄", expected: ["＿人人人人人＿", "＞　👨‍👩‍👧‍👦 😄　＜", "￣Y^Y^Y^Y^Y^Y￣"] },
  ];

  testCases.forEach((testCase) => {
    const actual = decorate(testCase.str);
    assertEquals(actual, testCase.expected);
  });
});
