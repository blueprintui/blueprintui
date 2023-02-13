import { defineElement } from '@blueprintui/components/internals';
import { BpGridPlaceholder } from '../placeholder/element.js';

defineElement('bp-grid-placeholder', BpGridPlaceholder);

declare global {
  interface HTMLElementTagNameMap {
    'bp-grid-placeholder': BpGridPlaceholder;
  }
}
