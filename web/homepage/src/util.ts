export function resolvePreset(preset: Record<string, any>, recipe: string): Record<string, string> {
  const lookup = preset.presets[recipe];
  if(!lookup) return {};

  // Do recursive expansion
  const all = {
    ...preset.shared,
    ...lookup,
  };

  return fullExpansion(all);
}

function fullExpansion(set: Record<string, string>, _from?: string, _counter?: Set<string>, _stash?: Map<string, string>): Record<string, string> {
  if(Object.keys(set).length === 0) return {};

  let counter: Set<string> = _counter ?? new Set();
  let stash: Map<string, string> = _stash ?? new Map();
  let from = _from ?? Object.keys(set).find(k => !stash.has(k));

  if(!from) return {
    ...Array.from(stash.entries()).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: v }),
      {}
    ),
  };

  console.log(`Resolving ${from}`);

  if(counter.has(from)) throw new Error(`Recursive expansion in param set at ${from}`);
  counter.add(from);

  let val = set[from];
  const regex = /\{ *([A-Z0-9_]+) *\}/g;
  let match: RegExpExecArray | null;
  const modifications: [number, number, string][] = [];
  while((match = regex.exec(val)) !== null) {
    const dependency = match[1];
    if(!stash.has(dependency)) fullExpansion(set, dependency, counter, stash);
    modifications.push([
      match.index,
      regex.lastIndex,
      stash.get(dependency) ?? '__RESOLUTION_FAILED__',
    ]);
  }

  modifications.reverse();
  for(const [f, t, v] of modifications)
    val = val.substr(0, f) + v + val.substr(t);

  counter.delete(from);

  stash.set(from, val);

  console.log(`Current stash`, stash);

  // Continue to find next unresolved key
  return fullExpansion(set, undefined, counter, stash);
}