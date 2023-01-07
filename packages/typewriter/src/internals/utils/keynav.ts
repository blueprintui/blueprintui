export function validKeyNavigationCode(e: KeyboardEvent) {
  return (
    e.code === KeyCode.ArrowUp ||
    e.code === KeyCode.ArrowDown ||
    e.code === KeyCode.ArrowLeft ||
    e.code === KeyCode.ArrowRight ||
    e.code === KeyCode.End ||
    e.code === KeyCode.Home ||
    e.code === KeyCode.PageUp ||
    e.code === KeyCode.PageDown
  );
}

export enum KeyCode {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  End = 'End',
  Home = 'Home',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
}

export function getNextKeyGridItem(grid: HTMLElement[][], config: { code: KeyCode | string; ctrlKey: boolean; dir: string, loop: boolean }) {
  const currentCell = grid.flat().find(i => i.tabIndex === 0) as HTMLElement;
  const currentRowCells = grid.find(r => r.find(c => c === currentCell));
  const numOfRows = grid.length - 1;
  const numOfColumns = grid[0].length - 1;
  const { code, ctrlKey, dir, loop } = config;

  let x = currentRowCells.indexOf(currentCell);
  let y = grid.indexOf(currentRowCells);

  const inlineStart = dir === 'rtl' ? KeyCode.ArrowRight : KeyCode.ArrowLeft;
  const inlineEnd = dir === 'rtl' ? KeyCode.ArrowLeft : KeyCode.ArrowRight;

  if (code === KeyCode.ArrowUp) {
    if (y !== 0) {
      y = y - 1;
    } else {
      y = loop ? numOfRows : 0;
    }
  } else if (code === KeyCode.ArrowDown) {
    if (y < numOfRows) {
      y = y + 1;
    } else {
      y = loop ? 0 : numOfRows;
    }
  } else if (code === inlineStart) {
    if (x !== 0) {
      x = x - 1;
    } else {
      x = loop ? numOfColumns : 0;
    }
  } else if (code === inlineEnd) {
    if (x < numOfColumns) {
      x = x + 1;
    } else {
      x = loop ? 0 : numOfColumns;
    }
  } else if (code === KeyCode.End) {
    x = numOfColumns;

    if (ctrlKey) {
      y = numOfRows;
    }
  } else if (code === KeyCode.Home) {
    x = 0;

    if (ctrlKey) {
      y = 0;
    }
  } else if (code === KeyCode.PageUp) {
    y = y - 4 > 0 ? y - 4 : 0;
  } else if (code === KeyCode.PageDown) {
    y = y + 4 < numOfRows ? y + 4 : numOfRows;
  }

  return { x, y };
}
