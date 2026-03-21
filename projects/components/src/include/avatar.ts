import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/user.js';
import { BpBadge } from '@blueprintui/components/badge';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpAvatar } from '@blueprintui/components/avatar';

defineScopedElement('bp-badge', BpBadge);
defineElement('bp-avatar', BpAvatar);

declare global {
  interface HTMLElementTagNameMap {
    'bp-avatar': BpAvatar;
  }
}
