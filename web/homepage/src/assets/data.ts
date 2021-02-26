const recipesCtx = require.context('./recipes', false, /.ya?ml$/);
const presetsCtx = require.context('./presets', false, /.ya?ml$/);

function getName(fn: string): string {
  return fn.match(/\/(.*).ya?ml$/)?.[1] ?? '';
}

export const RECIPES: Record<string, object> = recipesCtx
  .keys()
  .reduce((acc, cur) => ({ ...acc, [getName(cur)]: recipesCtx(cur) }), {});

export const PRESETS: Record<string, object> = presetsCtx
  .keys()
  .reduce((acc, cur) => ({ ...acc, [getName(cur)]: presetsCtx(cur) }), {});
