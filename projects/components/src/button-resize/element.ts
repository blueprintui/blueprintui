import { html, LitElement } from 'lit';
import { baseStyles } from '@blueprintui/components/internals';
import { SliderFormControlMixin } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/button-reisze.js';
 * ```
 *
 * ```html
 * <bp-button-resize></bp-button-resize>
 * ```
 *
 * @summary The resize button component is used to act as a drag handle to resize an element. Key navigation is supported and the step value can be used to adjust the amount of change when using the arrow keys.
 * @element bp-button-resize
 * @since 1.0.0
 * @cssprop --background
 * @cssprop --width
 * @cssprop --height
 */
export class BpButtonResize extends SliderFormControlMixin(LitElement) {
  static styles = [baseStyles, styles];

  render() {
    return html` <div part="internal"></div> `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.states.delete('bp-layer'); // override default form control layering
  }
}
