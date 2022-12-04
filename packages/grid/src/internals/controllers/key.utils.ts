import { KeyNavigationCode } from '../utils/keynav.js';
import { getFlattenedDOMTree } from '../utils/traversal.js';

export function getNextKeyGridItem(
  cells: HTMLElement[],
  rows: HTMLElement[],
  config: { code: KeyNavigationCode | string; ctrlKey: boolean; dir: string }
) {
  const currentCell = cells.find(i => i.tabIndex === 0) as HTMLElement;
  const currentRow = rows.find(r => getFlattenedDOMTree(r).find(c => c === currentCell)) as HTMLElement;
  const currentRowCells = Array.from(getFlattenedDOMTree(currentRow)).filter(c => !!cells.find(i => i === c));
  const numOfRows = rows.length - 1;
  const numOfColumns = currentRowCells.length - 1;
  const { code, ctrlKey, dir } = config;

  let x = currentRowCells.indexOf(currentCell);
  let y = rows.indexOf(currentRow);

  const inlineStart = dir === 'rtl' ? KeyNavigationCode.ArrowRight : KeyNavigationCode.ArrowLeft;
  const inlineEnd = dir === 'rtl' ? KeyNavigationCode.ArrowLeft : KeyNavigationCode.ArrowRight;

  if (code === KeyNavigationCode.ArrowUp && y !== 0) {
    y = y - 1;
  } else if (code === KeyNavigationCode.ArrowDown && y < numOfRows) {
    y = y + 1;
  } else if (code === inlineStart && x !== 0) {
    x = x - 1;
  } else if (code === inlineEnd && x < numOfColumns) {
    x = x + 1;
  } else if (code === KeyNavigationCode.End) {
    x = numOfColumns;

    if (ctrlKey) {
      y = numOfRows;
    }
  } else if (code === KeyNavigationCode.Home) {
    x = 0;

    if (ctrlKey) {
      y = 0;
    }
  } else if (code === KeyNavigationCode.PageUp) {
    y = y - 4 > 0 ? y - 4 : 0;
  } else if (code === KeyNavigationCode.PageDown) {
    y = y + 4 < numOfRows ? y + 4 : numOfRows;
  }

  return { x, y };
}
