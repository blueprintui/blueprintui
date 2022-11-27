import { defineElement } from '@blueprintui/components/internals';
import { BpButton } from '@blueprintui/components/button';

defineElement('bp-button', BpButton);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button': BpButton;
  }
}
