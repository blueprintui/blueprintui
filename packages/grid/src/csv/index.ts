import { BpGrid } from '@blueprintui/grid/index.js';

export function exportCSV(grid: BpGrid) {
  const rows = grid.grid.map(r => r.map(c => `${c.textContent}${c.querySelector('input')?.value ?? ''}`));
  return `${rows.map(cells => `${cells.map(c => c.trim()).join(',')}`).join('\n')}`;
}

export function downloadCSV(grid: BpGrid) {
  const a = document.createElement('a');
  a.href = `data:application/octet-stream,${encodeURIComponent(exportCSV(grid))}`;
  a.download = 'download.csv';
  a.click();
}
