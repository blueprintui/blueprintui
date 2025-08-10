export function getMonths(format: 'long' | 'numeric' | '2-digit' | 'short' | 'narrow' = 'long') {
  return Array.from(Array(12).keys()).map((_i, i) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(i);
    return date.toLocaleString('en-us', { month: format });
  });
}

/** returns next decade of the given year */
export function getYearSelection(year: number) {
  let y = year;
  return [year - 1, ...Array.from(Array(9).keys()).map(() => y++)];
}
