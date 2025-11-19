import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/microphone.js';
import '@blueprintui/icons/shapes/microphone-mute.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpSpeech } from '@blueprintui/components/speech';

defineElement('bp-speech', BpSpeech);

declare global {
  interface HTMLElementTagNameMap {
    'bp-speech': BpSpeech;
  }
}
