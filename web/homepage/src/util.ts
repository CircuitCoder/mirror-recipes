export function resolvePreset(preset: Record<string, any>, recipe: string): Record<string, string> {
  const lookup = preset.presets[recipe];
  if(!lookup) return {};
  console.log(lookup);

  // Do recursive expansion
  const all = {
    ...lookup,
    ...preset.shared,
  };

  return fullExpansion(lookup);
}

function fullExpansion(set: Record<string, string>, _from?: string, _counter?: Set<string>, _stash?: Map<string, string>): Record<string, string> {
  if(Object.keys(set).length === 0) return {};

  let from = _from ?? Object.keys(set)[0];
  let counter = _counter ?? new Set();
  let stash = _stash ?? new Map();

  if(counter.has(from)) throw new Error(`Recursive expansion in param set at ${from}`);
  counter.add(from);

  const regex = /\{ *([A-Z0-9_]+) *\}/g;
  let match: RegExpExecArray | null;
  const modifications: [number, number, string][] = [];
  while((match = regex.exec(from)) !== null) {
    const dependency = match[1];
    if(!stash.has(dependency)) fullExpansion(set, dependency, counter, stash);
    modifications.push([
      match.index,
      regex.lastIndex,
      stash.get(dependency),
    ]);
  }

  modifications.reverse();
  let val = set[from];
  for(const [f, t, v] of modifications)
    val = val.substr(0, f) + v + val.substr(t);

  counter.delete(from);

  stash.set(from, val);

  return {
    ...set,
    ...Array.from(stash.entries()).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: v }),
      {}
    ),
  };
}