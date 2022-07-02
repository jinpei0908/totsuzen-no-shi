import { Denops } from "https://deno.land/x/denops_std@v1.0.0/mod.ts";
import { ensureString } from "https://deno.land/x/unknownutil@v0.1.1/mod.ts";
import stringWidth from "https://esm.sh/string-width";
import { round } from "https://deno.land/x/math@v1.1.0/mod.ts";

/**
 * textを装飾した文字列のリストを返す
 */
export function decorate(text: string): string[] {
  const doubledDiplayWidth = stringWidth(text);
  const displayWidth = Number(round(doubledDiplayWidth / 2, 0));
  const top = `＿${"人".repeat(displayWidth + 2)}＿`;
  const medium = `＞　${text}　＜`;
  const bottom = `￣${"Y^".repeat(displayWidth + 2)}Y￣`;
  return [top, medium, bottom];
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
