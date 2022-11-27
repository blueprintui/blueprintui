
export function group(array: any[], n: number) {
  return [...Array(Math.ceil(array.length / n))].map((_e, i) => array.slice(i * n, (i + 1) * n));
}
