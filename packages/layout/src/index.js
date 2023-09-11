import { alignments } from './utils/_alignments.js';
import { layoutBlock } from './block/block.js';
import { layoutInline } from './inline/inline.js';
import { layoutGrid } from './grid/grid.js';
import { display } from './utils/_display.js';
import { spacing } from './utils/_spacing.js';
import { container } from './utils/_container.js';

export const styles = /* css */ `
:root,
:host {
  --βgfr: calc(100vw / 12);
  --β1: var(--bp-space-xs, 8px);
  --β2: var(--bp-space-sm, 16px);
  --β3: var(--bp-space-md, 24px);
  --β4: var(--bp-space-lg, 48px);
  --β5: var(--bp-space-xl, 64px);
  --βs1: span 1 / span 1;
  --βs2: span 2 / span 2;
  --βs3: span 3 / span 3;
  --βs4: span 4 / span 4;
  --βs5: span 5 / span 5;
  --βs6: span 6 / span 6;
  --βs7: span 7 / span 7;
  --βs8: span 8 / span 8;
  --βs9: span 9 / span 9;
  --βs10: span 10 / span 10;
  --βs11: span 11 / span 11;
  --βs12: span 12 / span 12;
}

@layer blueprintui {
  @layer layout {
    ${alignments}
    ${layoutBlock}
    ${layoutInline}
    ${layoutGrid}
    ${display}
    ${spacing}
    ${container}
  }
}

*,
*:before,
*:after,
:host {
  box-sizing: border-box;
}
`;
