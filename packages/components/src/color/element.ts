import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import { baseStyles, rgbToHex } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

declare const EyeDropper: any;

/**
 * Input
 *
 * ```typescript
 * import '@blueprintui/components/include/color.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>color</label>
 *   <bp-color></bp-color>
 * </bp-field>
 * ```
 *
 * @element bp-color
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @cssprop --background
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpColor extends BpInput {
  @property({ type: String, reflect: true }) type = 'color';

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`<bp-button-icon
      shape="color-picker"
      .disabled=${this.disabled}
      ?readonly=${!EyeDropper}
      @click=${this.#chooseColor}></bp-button-icon>`;
  }

  #chooseColor() {
    new EyeDropper()
      .open()
      .then((color: any) => {
        const [r, g, b] = color.sRGBHex
          .replace('rgb(', '')
          .replace(')', '')
          .split(',')
          .map((v: any) => parseInt(v.trim(), 10));
        this.value = rgbToHex(r, g, b);
      })
      .catch(() => {
        return;
      });
  }
}
