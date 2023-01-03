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

export function getNextKeyGridItem(grid: HTMLElement[][], config: { code: KeyCode | string; ctrlKey: boolean; dir: string }) {
  const currentCell = grid.flat().find(i => i.tabIndex === 0) as HTMLElement;
  const currentRowCells = grid.find(r => r.find(c => c === currentCell));
  const numOfRows = grid.length - 1;
  const numOfColumns = grid[0].length - 1;
  const { code, ctrlKey, dir } = config;

  let x = currentRowCells.indexOf(currentCell);
  let y = grid.indexOf(currentRowCells);

  const inlineStart = dir === 'rtl' ? KeyCode.ArrowRight : KeyCode.ArrowLeft;
  const inlineEnd = dir === 'rtl' ? KeyCode.ArrowLeft : KeyCode.ArrowRight;

  if (code === KeyCode.ArrowUp && y !== 0) {
    y = y - 1;
  } else if (code === KeyCode.ArrowDown && y < numOfRows) {
    y = y + 1;
  } else if (code === inlineStart && x !== 0) {
    x = x - 1;
  } else if (code === inlineEnd && x < numOfColumns) {
    x = x + 1;
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

export interface KeyListConfig {
  code: KeyCode;
  loop?: boolean;
  direction?: 'inline' | 'block' | 'all';
  dir?: string | null | undefined;
}

export function getNextKeyListItem(item: HTMLElement, items: HTMLElement[], config: KeyListConfig) {
  const { code, direction, loop, dir } = config;
  let i = items.indexOf(item);
  const previous = i;
  const inlineStart = dir === 'rtl' ? KeyCode.ArrowRight : KeyCode.ArrowLeft;
  const inlineEnd = dir === 'rtl' ? KeyCode.ArrowLeft : KeyCode.ArrowRight;
  const numOfItems = items.length - 1;

  if (direction !== 'inline' && code === KeyCode.ArrowUp && i !== 0) {
    i = i - 1;
  } else if (direction !== 'inline' && code === KeyCode.ArrowUp && i === 0 && loop) {
    i = numOfItems;
  } else if (direction !== 'inline' && code === KeyCode.ArrowDown && i < numOfItems) {
    i = i + 1;
  } else if (direction !== 'inline' && code === KeyCode.ArrowDown && i === numOfItems && loop) {
    i = 0;
  } else if (direction !== 'block' && code === inlineStart && i !== 0) {
    i = i - 1;
  } else if (direction !== 'block' && code === inlineEnd && i < numOfItems) {
    i = i + 1;
  } else if (direction !== 'block' && code === inlineStart && i === 0 && loop) {
    i = numOfItems;
  } else if (direction !== 'block' && code === inlineEnd && i === numOfItems && loop) {
    i = 0;
  } else if (code === KeyCode.End) {
    i = numOfItems;
  } else if (code === KeyCode.Home) {
    i = 0;
  } else if (code === KeyCode.PageUp) {
    i = i - 4 > 0 ? i - 4 : 0;
  } else if (code === KeyCode.PageDown) {
    i = i + 4 < numOfItems ? i + 4 : numOfItems;
  }

  return { next: i, previous };
}
