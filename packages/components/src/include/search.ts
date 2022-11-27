import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/shapes/search.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpSearch } from '@blueprintui/components/search';

defineElement('bp-search', BpSearch);

declare global {
  interface HTMLElementTagNameMap {
    'bp-search': BpSearch;
  }
}
