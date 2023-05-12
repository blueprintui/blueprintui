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
  --β1: var(--bp-space-xs, 8px);
  --β2: var(--bp-space-sm, 16px);
  --β3: var(--bp-space-md, 24px);
  --β4: var(--bp-space-lg, 48px);
  --β5: var(--bp-space-xl, 64px);
  --βgfr: calc(100vw / 12);
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
