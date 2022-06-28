import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { decorate } from "./main.ts";

Deno.test("decorate", () => {
  const str = "突然の死";
  const actual = decorate(str);
  const expected = ["＿人人人人＿", "＞ 突然の死 ＜", "￣Y^Y^Y^Y^Y￣"];

  assertEquals(actual, expected);
});
