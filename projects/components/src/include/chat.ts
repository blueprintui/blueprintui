import { defineElement } from '@blueprintui/components/internals';
import { BpChatMessage, BpChatGroup } from '@blueprintui/components/chat';
import '@blueprintui/components/include/progress-dot.js';

defineElement('bp-chat-message', BpChatMessage);
defineElement('bp-chat-group', BpChatGroup);

declare global {
  interface HTMLElementTagNameMap {
    'bp-chat-message': BpChatMessage;
    'bp-chat-group': BpChatGroup;
  }
}
