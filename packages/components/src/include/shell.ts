import '@blueprintui/components/include/drawer.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpShell } from '@blueprintui/components/shell';

defineElement('bp-shell', BpShell);

declare global {
  interface HTMLElementTagNameMap {
    'bp-shell': BpShell;
  }
}
