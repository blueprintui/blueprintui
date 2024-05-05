import { layout, block, inline, center, start, end, stretch } from '../utils/_tokens.js';
import { container, bpLayoutBreakpoints } from '../utils/mixins.js';

function generateHorizontalAxisAlignment(breakpoint = '') {
  return /* css */ `
  &[${layout}~='${block}:${start}${breakpoint}'] {
    align-content: start;
    align-items: start;
  }

  &[${layout}~='${block}:${end}${breakpoint}'] {
    align-content: end;
    align-items: end;
  }

  &[${layout}~='${block}:${center}${breakpoint}'] {
    align-content: center;
    align-items: center;
  }

  &[${layout}~='${inline}:${start}${breakpoint}'] {
    justify-content: start;
  }

  &[${layout}~='${inline}:${end}${breakpoint}'] {
    justify-content: end;
  }

  &[${layout}~='${inline}:${center}${breakpoint}'] {
    justify-content: center;
  }

  &[${layout}~='${center}${breakpoint}'] {
    align-content: center;
    justify-content: center;
  }
  `;
}

function generateHorizontalItemAlignment(breakpoint = '') {
  return /* css */ `
  & > [${layout}~='${inline}:${start}${breakpoint}'] {
    margin-inline-end: auto;
  }

  & > [${layout}~='${inline}:${end}${breakpoint}'] {
    margin-inline-start: auto;
  }

  & > [${layout}~='${inline}:${center}${breakpoint}'] {
    margin-inline: auto;
  }

  & > [${layout}~='${center}${breakpoint}'] {
    align-self: center;
    margin-inline: auto;
  }

  & > [${layout}~='${block}:${center}${breakpoint}'] {
    align-self: center;
  }

  & > [${layout}~='${block}:${start}${breakpoint}'] {
    align-self: start;
  }

  & > [${layout}~='${block}:${end}${breakpoint}'] {
    align-self: end;
  }
  `;
}

function generateHorizontalStretch(breakpoint = '') {
  return /* css */ `
  &[${layout}~='${block}:${stretch}${breakpoint}'] {
    align-items: stretch;
    align-content: stretch;
    flex-grow: 1;

    & > * {
      flex-grow: initial;
    }
  }

  &[${layout}~='${inline}:${stretch}${breakpoint}'] {
    justify-content: stretch;
    align-items: start;
    flex-grow: 1;

    & > * {
      flex-grow: 1;
    }
  }

  &[${layout}~='${stretch}${breakpoint}'] {
    align-items: stretch;
    align-content: stretch;
    flex-grow: 1;

    & > * {
      flex-grow: 1;
    }
  }
  `;
}

export const layoutInline = /* css */ `
  [${layout}~='${inline}'] {
    container-type: inline-size;
    display: flex;
    flex-direction: row;
    justify-items: start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    margin-inline: initial;
    margin-block: initial;
    min-height: 0;

    &:has([popovertarget]) {
      container-type: initial;
    }

    & > [${layout}~='${inline}'],
    & > [${layout}~='${block}'],
    & > [bp-text] {
      width: initial !important;
      container-type: initial !important;
    }
  }

  [${layout}~='${inline}']:has(> [${layout}*='block:']) {
    flex-wrap: initial;
  }

  [${layout}~='${inline}'] {
    ${generateHorizontalAxisAlignment()}
    ${generateHorizontalItemAlignment()}
    ${generateHorizontalStretch()}
  }

  ${Object.entries(bpLayoutBreakpoints)
    .map(([breakpoint, breakpointValue]) => {
      return container(
        breakpointValue,
        `
        [${layout}~='${inline}'] {
          ${generateHorizontalAxisAlignment(breakpoint)}
          ${generateHorizontalItemAlignment(breakpoint)}
          ${generateHorizontalStretch(breakpoint)}
        }`
      );
    })
    .join('')}
`;
