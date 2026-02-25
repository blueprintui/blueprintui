import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/fullscreen.js';
import '@blueprintui/icons/shapes/fullscreen-exit.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonFullscreen } from '@blueprintui/components/button-fullscreen';

defineElement('bp-button-fullscreen', BpButtonFullscreen);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-fullscreen': BpButtonFullscreen;
  }
}
