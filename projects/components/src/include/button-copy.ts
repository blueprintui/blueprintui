import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/copy.js';
import '@blueprintui/icons/shapes/check.js';
import '@blueprintui/icons/shapes/error.js';
import { BpTooltip } from '@blueprintui/components/tooltip';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpButtonCopy } from '@blueprintui/components/button-copy';

defineScopedElement('bp-tooltip', BpTooltip);
defineElement('bp-button-copy', BpButtonCopy);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-copy': BpButtonCopy;
  }
}
