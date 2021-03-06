function expand(_val: string, params: Record<string, string>): string {
  let val = _val;
  const regex = /\{ *([A-Z0-9_]+) *\}/g;
  let match: RegExpExecArray | null;
  const modifications: [number, number, string][] = [];
  while((match = regex.exec(val)) !== null) {
    const dependency = match[1];
    modifications.push([
      match.index,
      regex.lastIndex,
      params[dependency] ?? '',
    ]);
  }

  modifications.reverse();
  for(const [f, t, v] of modifications)
    val = val.substr(0, f) + v + val.substr(t);

  return val;
}