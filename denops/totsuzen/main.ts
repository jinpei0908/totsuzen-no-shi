import { Denops } from "https://deno.land/x/denops_std@v1.0.0/mod.ts";
import { ensureString } from "https://deno.land/x/unknownutil@v0.1.1/mod.ts";
import stringWidth from "https://esm.sh/string-width";
import { round } from "https://deno.land/x/math@v1.1.0/mod.ts";

const PADDING_SIZE = 2;

/**
 * 最大表示幅を求める
 */
export function getMaxDispalyWidth(texts: string[]): number {
  return texts
    .map((t) => stringWidth(t))
    .reduce((a, b) => a > b ? a : b);
}

/**
 * 真ん中の文字列を作成する
 */
export function createMedium(
  text: string,
  maxDisplayWidth: number,
): string {
  const length = [...text].length;
  const padding = length + (maxDisplayWidth - stringWidth(text));
  return `＞　${text.padEnd(padding)}　＜`;
}

/**
 * textを装飾した文字列のリストを返す
 */
export function decorate(text: string): string[] {
  // 改行でtextを分割する
  const texts = text.split(/\\r\\n|\\r|\\n/);

  const maxDisplayWidth = getMaxDispalyWidth(texts);
  const repeatCount = Number(round(maxDisplayWidth / 2, 0));

  const top = `＿${"人".repeat(repeatCount + PADDING_SIZE)}＿`;
  const medium = texts
    .map((t) => createMedium(t, maxDisplayWidth));
  const bottom = `￣${"Y^".repeat(repeatCount + PADDING_SIZE)}Y￣`;

  return [top, ...medium, bottom];
}

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async totsuzen(text: unknown): Promise<void> {
      ensureString(text);
      const decoratedText = decorate(text);
      await denops.call("append", ".", decoratedText);
    },
  };

  await denops.cmd(
    `command! -nargs=1 Totsuzen call denops#request('${denops.name}', 'totsuzen', [<q-args>])`,
  );
}
