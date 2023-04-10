import { layout } from './_tokens.js';

export const container = /* css */ `
  [${layout}='scroll:none'] {
    overflow: hidden !important;
  }

  [${layout}~='fill'] {
    width: 100% !important;
  }
`;
