import { BpAvatar } from '@blueprintui/components/avatar';
import { defineElement } from '@blueprintui/components/internals';

defineElement('bp-avatar', BpAvatar);

declare global {
  interface HTMLElementTagNameMap {
    'bp-avatar': BpAvatar;
  }
}
