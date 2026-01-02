import {
  layout,
  grid,
  rows,
  row,
  col,
  cols,
  bpGridCols,
  bpGridColsStatic,
  inline,
  center,
  start,
  end,
  stretch,
  block,
  bpSpan
} from '../utils/_tokens.js';
import { container, bpLayoutBreakpoints } from '../utils/mixins.js';

const breakpoints = Object.entries(bpLayoutBreakpoints);

function generateColumns(breakpoint = '') {
  return Array(parseInt(bpGridColsStatic))
    .fill('')
    .map((_, i) => i + 1)
    .map(i => {
      return /* css */ `
    [${layout}~='${cols}:${i}${breakpoint}'] > * {
      grid-column: ${bpSpan(i)};
    }
    `;
    })
    .join('');
}

function generateRows(breakpoint = '') {
  return Array(parseInt(bpGridColsStatic))
    .fill('')
    .map((_, i) => i + 1)
    .map(i => {
      return /* css */ `
    [${layout}~='${rows}:${i}${breakpoint}'] > * {
      grid-row: ${bpSpan(i)};
    }
    `;
    })
    .join('');
}

function generateExplicitColumn(breakpoint = '') {
  return Array(parseInt(bpGridColsStatic))
    .fill('')
    .map((_, i) => i + 1)
    .map(i => {
      return /* css */ `
    [${layout}~='${col}:${i}${breakpoint}'] {
      grid-column: ${bpSpan(i)};
    }
    `;
    })
    .join('');
}

function generateExplicitRow(breakpoint = '') {
  return Array(parseInt(bpGridColsStatic))
    .fill('')
    .map((_, i) => i + 1)
    .map(i => {
      return /* css */ `
    [${layout}~='${row}:${i}${breakpoint}'] {
      grid-row: ${bpSpan(i)};
    }
    `;
    })
    .join('');
}

function generateColumnPositions(breakpoint = '') {
  // +1 for grid cols/rows which end at beginning of next item
  return Array(parseInt(bpGridColsStatic) + 1)
    .fill('')
    .map((_, i) => i + 1)
    .map(i => {
      return /* css */ `
    [${layout}~='${col}:start-${i}${breakpoint}'] {
      grid-column-start: ${i};
    }

    [${layout}~='${col}:end-${i}${breakpoint}'] {
      grid-column-end: ${i};
    }
    `;
    })
    .join('');
}

function generateRowPositions(breakpoint = '') {
  // +1 for grid cols/rows which end at beginning of next item
  return Array(parseInt(bpGridColsStatic) + 1)
    .fill('')
    .map((_, i) => i + 1)
    .map(i => {
      return /* css */ `
    [${layout}~='${row}:start-${i}${breakpoint}'] {
      grid-row-start: ${i};
    }

    [${layout}~='${row}:end-${i}${breakpoint}'] {
      grid-row-end: ${i};
    }
    `;
    })
    .join('');
}

function generateAlignments(breakpoint = '') {
  return /* css */ `
    [${layout}~='${grid}'] {
      &[${layout}~='${block}:${start}${breakpoint}'] {
        align-content: start;
      }

      &[${layout}~='${inline}:${end}${breakpoint}'] {
        justify-content: end;
      }

      &[${layout}~='${block}:${end}${breakpoint}'] {
        align-content: end;
      }

      &[${layout}~='${inline}:${start}'] {
        justify-content: start;
      }

      &[${layout}~='${block}:${center}${breakpoint}'] {
        align-items: center;
        align-content: center;
      }

      &[${layout}~='${inline}:${center}${breakpoint}'] {
        justify-items: center;
        justify-content: center;
      }

      &[${layout}~='${center}${breakpoint}'] {
        align-items: center;
        align-content: center;
        justify-items: center;
        justify-content: center;
      }

      &[${layout}~='${block}:${stretch}${breakpoint}'] {
        align-items: stretch;
        align-content: stretch;
      }

      &[${layout}~='${inline}:${stretch}${breakpoint}'] {
        justify-items: stretch;
        justify-content: stretch;
      }

      &[${layout}~='${stretch}${breakpoint}'] {
        align-items: stretch;
        align-content: stretch;
        justify-items: stretch;
        justify-content: stretch;
      }
    }
    `;
}

export const layoutGrid = /* css */ `
  [${layout}~='${grid}'] {
    container-type: inline-size;
    display: grid;
    align-items: start;
    align-content: start;
    justify-content: initial;
    grid-template-columns: repeat(${bpGridCols}, 1fr);
    width: 100%;

    &:has([popovertarget]) {
      /* container-type: initial; */
    }

    &[${layout}*='${rows}'] {
      grid-template-rows: repeat(12, auto);
    }

    & > [${layout}*='${row}'] {
      align-self: stretch;
    }

    &[${layout}~='${cols}:auto'] {
      grid-auto-flow: column;
      grid-template-columns: initial;
    }
  }

  [${layout}*='${col}'] {
    grid-column: span 12;
  }

  ${generateColumns()}
  ${generateExplicitColumn()}
  ${generateColumnPositions()}
  ${generateRows()}
  ${generateExplicitRow()}
  ${generateRowPositions()}
  ${generateAlignments()}

  ${breakpoints.map(([breakpoint, value]) => container(value, `${generateColumns(breakpoint)}`)).join('')}
  ${breakpoints.map(([breakpoint, value]) => container(value, `${generateExplicitColumn(breakpoint)}`)).join('')}
  ${breakpoints.map(([breakpoint, value]) => container(value, `${generateColumnPositions(breakpoint)}`)).join('')}
  ${breakpoints.map(([breakpoint, value]) => container(value, `${generateRows(breakpoint)}`)).join('')}
  ${breakpoints.map(([breakpoint, value]) => container(value, `${generateExplicitRow(breakpoint)}`)).join('')}
  ${breakpoints.map(([breakpoint, value]) => container(value, `${generateRowPositions(breakpoint)}`)).join('')}
  ${breakpoints.map(([breakpoint, value]) => container(value, `${generateAlignments(breakpoint)}`)).join('')}
`;
