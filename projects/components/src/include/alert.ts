import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/ellipsis-vertical.js';
import '@blueprintui/icons/shapes/close.js';
import '@blueprintui/icons/shapes/info.js';
import '@blueprintui/icons/shapes/success.js';
import '@blueprintui/icons/shapes/warning.js';
import '@blueprintui/icons/shapes/error.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpAlert, BpAlertGroup } from '@blueprintui/components/alert';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-alert', BpAlert);
defineElement('bp-alert-group', BpAlertGroup);

declare global {
  interface HTMLElementTagNameMap {
    'bp-alert': BpAlert;
    'bp-alert-group': BpAlertGroup;
  }
}
