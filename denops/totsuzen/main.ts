import { Denops } from "https://deno.land/x/denops_std@v1.0.0/mod.ts";
import { ensureString } from "https://deno.land/x/unknownutil@v0.1.1/mod.ts";

function decorate(text: string): string[] {
  const length = text.length;
  const top = `＿${"人".repeat(length)}＿`;
  const medium = `＞ ${text} ＜`;
  const bottom = `￣${"Y^".repeat(length)}Y￣`;
  return [top, medium, bottom];
}

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async totsuzen(text: unknown): Promise<void> {
      ensureString(text);
      const decoratedText = decorate(text);
      await denops.call("setline", ".", decoratedText);
    },
  };

  await denops.cmd(
    `command! -nargs=1 Totsuzen call denops#request('${denops.name}', 'totsuzen', [<q-args>])`,
  );
}
