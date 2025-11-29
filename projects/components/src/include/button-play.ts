import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/play.js';
import '@blueprintui/icons/shapes/pause.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonPlay } from '@blueprintui/components/button-play';

defineElement('bp-button-play', BpButtonPlay);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-play': BpButtonPlay;
  }
}
