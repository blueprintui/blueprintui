import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/volume.js';
import '@blueprintui/icons/shapes/volume-mute.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonMute } from '@blueprintui/components/button-mute';

defineElement('bp-button-mute', BpButtonMute);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-mute': BpButtonMute;
  }
}
