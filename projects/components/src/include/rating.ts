import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpRating } from '@blueprintui/components/rating';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/favorite.js';

defineElement('bp-rating', BpRating);

declare global {
  interface HTMLElementTagNameMap {
    'bp-rating': BpRating;
  }
}
