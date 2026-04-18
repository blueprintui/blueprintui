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
  PageDown = 'PageDown'
}

type KeyNavContext = {
  x: number;
  y: number;
  numOfRows: number;
  numOfColumns: number;
  loop: boolean;
  ctrlKey: boolean;
};

type KeyHandler = (ctx: KeyNavContext) => { x: number; y: number };

const keyHandlers: Record<string, KeyHandler> = {
  [KeyCode.ArrowUp]: ({ x, y, numOfRows, loop }) => ({ x, y: stepBack(y, numOfRows, loop) }),
  [KeyCode.ArrowDown]: ({ x, y, numOfRows, loop }) => ({ x, y: stepForward(y, numOfRows, loop) }),
  [KeyCode.End]: ({ y, numOfRows, numOfColumns, ctrlKey }) => ({ x: numOfColumns, y: ctrlKey ? numOfRows : y }),
  [KeyCode.Home]: ({ y, ctrlKey }) => ({ x: 0, y: ctrlKey ? 0 : y }),
  [KeyCode.PageUp]: ({ x, y }) => ({ x, y: Math.max(y - 4, 0) }),
  [KeyCode.PageDown]: ({ x, y, numOfRows }) => ({ x, y: Math.min(y + 4, numOfRows) })
};

export function getNextKeyGridItem(
  grid: HTMLElement[][],
  config: { code: KeyCode | string; ctrlKey: boolean; dir: string; loop: boolean }
) {
  const currentCell = grid.flat().find(i => i.tabIndex === 0) as HTMLElement;
  const currentRowCells = grid.find(r => r.find(c => c === currentCell)) ?? grid[0];
  const { code, ctrlKey, dir, loop } = config;
  const ctx: KeyNavContext = {
    x: currentRowCells.indexOf(currentCell),
    y: grid.indexOf(currentRowCells),
    numOfRows: grid.length - 1,
    numOfColumns: grid[0].length - 1,
    loop,
    ctrlKey
  };

  const inlineStart = dir === 'rtl' ? KeyCode.ArrowRight : KeyCode.ArrowLeft;
  const inlineEnd = dir === 'rtl' ? KeyCode.ArrowLeft : KeyCode.ArrowRight;

  if (code === inlineStart) {
    return { x: stepBack(ctx.x, ctx.numOfColumns, loop), y: ctx.y };
  }
  if (code === inlineEnd) {
    return { x: stepForward(ctx.x, ctx.numOfColumns, loop), y: ctx.y };
  }

  return keyHandlers[code as string]?.(ctx) ?? { x: ctx.x, y: ctx.y };
}

function stepBack(pos: number, max: number, loop: boolean) {
  if (pos !== 0) return pos - 1;
  return loop ? max : 0;
}

function stepForward(pos: number, max: number, loop: boolean) {
  if (pos < max) return pos + 1;
  return loop ? 0 : max;
}
