import { generateGaps, spacers, axisSpacers, sideSpacers } from './mixins.js';

export const spacing = /* css */ `
  ${generateGaps()}
  ${spacers()}
  ${axisSpacers()}
  ${sideSpacers()}
`;
