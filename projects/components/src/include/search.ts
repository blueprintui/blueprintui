import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/shapes/search.js';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpSearch } from '@blueprintui/components/search';
import { BpButtonIcon } from '@blueprintui/components/button-icon';

defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-search', BpSearch);

declare global {
  interface HTMLElementTagNameMap {
    'bp-search': BpSearch;
  }
}
