export function group(array: any[], n: number) {
  return [...Array(Math.ceil(array.length / n))].map((_e, i) => array.slice(i * n, (i + 1) * n));
}

export function selectionStates(items: { selected: boolean }[]) {
  return {
    allSelected: items.every(i => i.selected),
    anySelected: items.some(i => i.selected),
    noneSelected: items.every(i => !i.selected)
  };
}
