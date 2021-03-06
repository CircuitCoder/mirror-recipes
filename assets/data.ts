const recipesCtx = require.context('./recipes', false, /.ya?ml$/);
const presetsCtx = require.context('./presets', false, /.ya?ml$/);

function getName(fn: string): string {
  return fn.match(/\/(.*).ya?ml$/)?.[1] ?? '';
}

export const RECIPES: Record<string, Record<string, any>> = recipesCtx
  .keys()
  .reduce((acc, cur) => ({ ...acc, [getName(cur)]: recipesCtx(cur) }), {});

export const PRESETS: Record<string, Record<string, any>> = presetsCtx
  .keys()
  .reduce((acc, cur) => ({ ...acc, [getName(cur)]: presetsCtx(cur) }), {});
