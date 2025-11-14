import { BpAvatar } from '@blueprintui/components/avatar';
import { defineElement } from '@blueprintui/components/internals';
import '@blueprintui/components/include/badge.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/user.js';

defineElement('bp-avatar', BpAvatar);

declare global {
  interface HTMLElementTagNameMap {
    'bp-avatar': BpAvatar;
  }
}
