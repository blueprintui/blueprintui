import { defineElement } from '@blueprintui/components/internals';
import { BpTooltip } from '@blueprintui/components/tooltip';

defineElement('bp-tooltip', BpTooltip);

declare global {
  interface HTMLElementTagNameMap {
    'bp-tooltip': BpTooltip;
  }
}
