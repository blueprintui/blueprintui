import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/ellipsis-vertical.js';
import '@blueprintui/icons/shapes/close.js';
import '@blueprintui/icons/shapes/info-circle.js';
import '@blueprintui/icons/shapes/check-circle.js';
import '@blueprintui/icons/shapes/warning.js';
import '@blueprintui/icons/shapes/exclamation-circle.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpAlert, BpAlertGroup } from '@blueprintui/components/alert';

defineElement('bp-alert', BpAlert);
defineElement('bp-alert-group', BpAlertGroup);

declare global {
  interface HTMLElementTagNameMap {
    'bp-alert': BpAlert;
    'bp-alert-group': BpAlertGroup;
  }
}
