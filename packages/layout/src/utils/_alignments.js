import { fill, shrink } from './_tokens.js';
import { container, bpLayoutBreakpoints } from './mixins.js';

// common alignment styles shared between vertical and horizontal layouts

export function generateHorizontalVerticalAxisFill(breakpoint = '') {
  return /* css */ `
    [bp-layout~='${fill}${breakpoint}'] > * {
      flex-grow: 1 !important;
      flex-basis: 0 !important;
    }
  `;
}

export function generateHorizontalVerticalWrap(breakpoint = '') {
  return /* css */ `
    [bp-layout~='wrap:none${breakpoint}'] {
      flex-wrap: nowrap !important;
    }
  `;
}

export function generateHorizontalVerticalItemStretchShrink(breakpoint = '') {
  return /* css */ `
    [bp-layout~='${fill}${breakpoint}'] {
      flex-grow: 1 !important;
    }

    [bp-layout~='${shrink}${breakpoint}'] {
      flex-shrink: 1 !important;
      flex-grow: 0 !important;
    }
  `;
}

export const alignments = `
  ${generateHorizontalVerticalAxisFill()}
  ${generateHorizontalVerticalWrap()}
  ${generateHorizontalVerticalItemStretchShrink()}

  ${Object.entries(bpLayoutBreakpoints)
    .map(([breakpoint, breakpointValue]) => {
      return container(
        breakpointValue,
        `
      ${generateHorizontalVerticalAxisFill(breakpoint)}
      ${generateHorizontalVerticalWrap(breakpoint)}
      ${generateHorizontalVerticalItemStretchShrink(breakpoint)}
    `
      );
    })
    .join('')}
`;
