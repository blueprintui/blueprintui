import {
  layout,
  block,
  inline,
  center,
  start,
  end,
  align,
  stretch,
  blockStretch,
  inlineStretch
} from '../utils/_tokens.js';
import { container, bpLayoutBreakpoints } from '../utils/mixins.js';

function generateVerticalAxisAlignment(breakpoint = '') {
  return /* css */ `
  &[${layout}~='${block}:${start}${breakpoint}'] {
    justify-content: start;
  }

  &[${layout}~='${block}:${end}${breakpoint}'] {
    justify-content: end;
  }

  &[${layout}~='${block}:${center}${breakpoint}'] {
    justify-content: center;
  }

  &[${layout}~='${inline}:${start}${breakpoint}'] {
    align-items: start;
  }

  &[${layout}~='${inline}:${end}${breakpoint}'] {
    align-items: end;
  }

  &[${layout}~='${inline}:${center}${breakpoint}'] {
    align-items: center;
  }

  &[${layout}~='${center}${breakpoint}'] {
    align-items: center;
    justify-content: center;
  }
  `;
}

function generateVerticalStretch(breakpoint = '') {
  return /* css */ `
  &[${layout}~='${align}:${blockStretch}${breakpoint}'] {
    justify-content: stretch;

    & > * {
      flex-grow: 1;
    }
  }

  &[${layout}~='${align}:${inlineStretch}${breakpoint}'] {
    align-items: stretch;
  }

  &[${layout}~='${align}:${stretch}${breakpoint}'] {
    align-items: stretch;
    justify-content: stretch;

    & > * {
      flex-grow: 1;
    }
  }
  `;
}

function generateVerticalItemAlignment(breakpoint = '') {
  return /* css */ `
  & > [${layout}~='${center}${breakpoint}'] {
    align-self: center;
    margin-block: auto;
  }

  & > [${layout}~='${block}:${start}${breakpoint}'] {
    margin-block-end: auto;
  }

  & > [${layout}~='${block}:${end}${breakpoint}'] {
    margin-block-start: auto !important;
  }

  & > [${layout}~='${block}:${center}${breakpoint}'] {
    margin-block: auto;
  }

  & > [${layout}~='${inline}:${start}${breakpoint}'] {
    margin-inline-end: auto;
  }

  & > [${layout}~='${inline}:${end}${breakpoint}'] {
    margin-inline-start: auto;
  }

  & > [${layout}~='${inline}:${center}${breakpoint}'] {
    align-self: center;
  }
  `;
}

export const layoutBlock = /* css */ `
  [${layout}~='${block}'] {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    /* &:has([popovertarget]) {
      container-type: initial;
    } */
  }

  [${layout}~='${block}'] {
    ${generateVerticalAxisAlignment()}
    ${generateVerticalItemAlignment()}
    ${generateVerticalStretch()}
  }

  ${Object.entries(bpLayoutBreakpoints)
    .map(([breakpoint, breakpointValue]) => {
      return container(
        breakpointValue,
        `
        [${layout}~='${block}'] {
          ${generateVerticalAxisAlignment(breakpoint)}
          ${generateVerticalItemAlignment(breakpoint)}
          ${generateVerticalStretch(breakpoint)}
        }`
      );
    })
    .join('')}
`;
