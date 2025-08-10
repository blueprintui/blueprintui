import {
  gap,
  layout,
  bpGapFr,
  bpSpaceXs,
  bpSpaceSm,
  bpSpaceMd,
  bpSpaceLg,
  bpSpaceXl,
  bpWidthXsStatic,
  bpWidthSmStatic,
  bpWidthMdStatic,
  bpWidthLgStatic,
  bpWidthXlStatic,
  bpWidthXs,
  bpWidthSm,
  bpWidthMd,
  bpWidthLg,
  bpWidthXl
} from './_tokens.js';

export const bpLayoutSizes = {
  none: 0,
  xs: bpSpaceXs,
  sm: bpSpaceSm,
  md: bpSpaceMd,
  lg: bpSpaceLg,
  xl: bpSpaceXl
};

export const bpLayoutBreakpoints = {
  '@xs': bpWidthXsStatic,
  '@sm': bpWidthSmStatic,
  '@md': bpWidthMdStatic,
  '@lg': bpWidthLgStatic,
  '@xl': bpWidthXlStatic
};

export const bpLayoutWidths = {
  xs: bpWidthXs,
  sm: bpWidthSm,
  md: bpWidthMd,
  lg: bpWidthLg,
  xl: bpWidthXl
};

export const bpLayoutSpacingSides = {
  top: 't',
  right: 'r',
  bottom: 'b',
  left: 'l'
};

export function container(size, content) {
  return `@container (${size} <= width) {
    ${content}
  }`;
}

export function generateGaps(breakpoint = '') {
  return Object.entries(bpLayoutSizes)
    .map(([size, sizeValue]) => {
      return `[${layout}~='${gap}:${size}${breakpoint}'] {
      gap: min(${bpGapFr}, ${sizeValue});
    }`;
    })
    .join('');
}

export function spacers(breakpoint = '') {
  return Object.entries(bpLayoutSizes)
    .map(([size, sizeValue]) => {
      return `[${layout}~='m:${size}${breakpoint}'] {
      margin: ${sizeValue} !important;
    }`;
    })
    .join('');
}

export function axisSpacers(breakpoint = '') {
  return Object.entries(bpLayoutSizes)
    .map(([size, sizeValue]) => {
      return `[${layout}~='m-x:${size}${breakpoint}'] {
      margin-inline: ${sizeValue} !important;
    }

    [${layout}~='m-y:${size}${breakpoint}'] {
      margin-block: ${sizeValue} !important;
    }`;
    })
    .join('');
}

export function sideSpacers(breakpoint = '') {
  return Object.entries(bpLayoutSizes)
    .map(([size, sizeValue]) => {
      return Object.entries(bpLayoutSpacingSides)
        .map(([side, sideValue]) => {
          return `[${layout}~='m-${sideValue}:${size}${breakpoint}'] {
        margin-${side}: ${sizeValue} !important;
      }`;
        })
        .join('');
    })
    .join('');
}
