import { KeyCode, validKeyNavigationCode, getNextKeyGridItem } from './keynav.js';

describe('validKeyNavigationCode(): ', () => {
  it('should validate key code is valid navigation option', () => {
    expect(validKeyNavigationCode({ code: 'invalid' } as KeyboardEvent)).toBe(false);
    expect(validKeyNavigationCode({ code: KeyCode.Home } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.End } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.PageUp } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.PageDown } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.ArrowUp } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.ArrowDown } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.ArrowLeft } as KeyboardEvent)).toBe(true);
    expect(validKeyNavigationCode({ code: KeyCode.ArrowRight } as KeyboardEvent)).toBe(true);
  });
});

describe('getNextKeyGridItem', () => {
  function makeGrid(rows: number, cols: number) {
    const grid: HTMLElement[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: HTMLElement[] = [];
      for (let c = 0; c < cols; c++) {
        const el = document.createElement('div');
        el.tabIndex = -1;
        row.push(el);
      }
      grid.push(row);
    }
    grid[0][0].tabIndex = 0;
    return grid;
  }

  function setActive(grid: HTMLElement[][], row: number, col: number) {
    grid.flat().forEach(el => (el.tabIndex = -1));
    grid[row][col].tabIndex = 0;
  }

  it('should move right with ArrowRight', () => {
    const grid = makeGrid(3, 3);
    const result = getNextKeyGridItem(grid, { code: KeyCode.ArrowRight, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 1, y: 0 });
  });

  it('should move left with ArrowLeft', () => {
    const grid = makeGrid(3, 3);
    setActive(grid, 0, 2);
    const result = getNextKeyGridItem(grid, { code: KeyCode.ArrowLeft, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 1, y: 0 });
  });

  it('should move down with ArrowDown', () => {
    const grid = makeGrid(3, 3);
    const result = getNextKeyGridItem(grid, { code: KeyCode.ArrowDown, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 0, y: 1 });
  });

  it('should move up with ArrowUp', () => {
    const grid = makeGrid(3, 3);
    setActive(grid, 2, 0);
    const result = getNextKeyGridItem(grid, { code: KeyCode.ArrowUp, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 0, y: 1 });
  });

  it('should not move past grid bounds without loop', () => {
    const grid = makeGrid(3, 3);
    const result = getNextKeyGridItem(grid, { code: KeyCode.ArrowLeft, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 0, y: 0 });
  });

  it('should loop ArrowRight to start of row', () => {
    const grid = makeGrid(3, 3);
    setActive(grid, 0, 2);
    const result = getNextKeyGridItem(grid, { code: KeyCode.ArrowRight, ctrlKey: false, dir: 'ltr', loop: true });
    expect(result).toEqual({ x: 0, y: 0 });
  });

  it('should loop ArrowDown to top of column', () => {
    const grid = makeGrid(3, 3);
    setActive(grid, 2, 0);
    const result = getNextKeyGridItem(grid, { code: KeyCode.ArrowDown, ctrlKey: false, dir: 'ltr', loop: true });
    expect(result).toEqual({ x: 0, y: 0 });
  });

  it('should loop ArrowUp to bottom of column', () => {
    const grid = makeGrid(3, 3);
    const result = getNextKeyGridItem(grid, { code: KeyCode.ArrowUp, ctrlKey: false, dir: 'ltr', loop: true });
    expect(result).toEqual({ x: 0, y: 2 });
  });

  it('should loop ArrowLeft to end of row', () => {
    const grid = makeGrid(3, 3);
    const result = getNextKeyGridItem(grid, { code: KeyCode.ArrowLeft, ctrlKey: false, dir: 'ltr', loop: true });
    expect(result).toEqual({ x: 2, y: 0 });
  });

  it('should move to end of row with End', () => {
    const grid = makeGrid(3, 3);
    const result = getNextKeyGridItem(grid, { code: KeyCode.End, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 2, y: 0 });
  });

  it('should move to start of row with Home', () => {
    const grid = makeGrid(3, 3);
    setActive(grid, 0, 2);
    const result = getNextKeyGridItem(grid, { code: KeyCode.Home, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 0, y: 0 });
  });

  it('should move to last cell with Ctrl+End', () => {
    const grid = makeGrid(3, 3);
    const result = getNextKeyGridItem(grid, { code: KeyCode.End, ctrlKey: true, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 2, y: 2 });
  });

  it('should move to first cell with Ctrl+Home', () => {
    const grid = makeGrid(3, 3);
    setActive(grid, 2, 2);
    const result = getNextKeyGridItem(grid, { code: KeyCode.Home, ctrlKey: true, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 0, y: 0 });
  });

  it('should page down by 4 rows', () => {
    const grid = makeGrid(10, 3);
    const result = getNextKeyGridItem(grid, { code: KeyCode.PageDown, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 0, y: 4 });
  });

  it('should page up by 4 rows', () => {
    const grid = makeGrid(10, 3);
    setActive(grid, 5, 0);
    const result = getNextKeyGridItem(grid, { code: KeyCode.PageUp, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 0, y: 1 });
  });

  it('should clamp PageDown to last row', () => {
    const grid = makeGrid(3, 3);
    const result = getNextKeyGridItem(grid, { code: KeyCode.PageDown, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 0, y: 2 });
  });

  it('should clamp PageUp to first row', () => {
    const grid = makeGrid(3, 3);
    setActive(grid, 1, 0);
    const result = getNextKeyGridItem(grid, { code: KeyCode.PageUp, ctrlKey: false, dir: 'ltr', loop: false });
    expect(result).toEqual({ x: 0, y: 0 });
  });

  it('should invert ArrowRight and ArrowLeft in RTL mode', () => {
    const grid = makeGrid(3, 3);
    const right = getNextKeyGridItem(grid, { code: KeyCode.ArrowRight, ctrlKey: false, dir: 'rtl', loop: false });
    expect(right).toEqual({ x: 0, y: 0 });

    const left = getNextKeyGridItem(grid, { code: KeyCode.ArrowLeft, ctrlKey: false, dir: 'rtl', loop: false });
    expect(left).toEqual({ x: 1, y: 0 });
  });
});
