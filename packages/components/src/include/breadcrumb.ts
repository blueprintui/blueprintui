import { defineElement } from '@blueprintui/components/internals';
import { BpBreadcrumb } from '@blueprintui/components/breadcrumb';

defineElement('bp-breadcrumb', BpBreadcrumb);

declare global {
  interface HTMLElementTagNameMap {
    'bp-breadcrumb': BpBreadcrumb;
  }
}
