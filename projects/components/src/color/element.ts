import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

declare const EyeDropper: any;

/**
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
 * @summary The color input component is used to allow users to select a color from a predefined set of options or to input a specific color value.
 * @element bp-color
 * @since 1.0.0
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @cssprop --background
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpColor extends BpInput implements Pick<BpTypeControl, keyof BpColor> {
  @property({ type: String, reflect: true }) accessor type = 'color';

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`<bp-button-icon
      shape="color-picker"
      .disabled=${this.disabled}
      ?readonly=${!EyeDropper}
      action="inline"
      @click=${this.#chooseColor}></bp-button-icon>`;
  }

  #chooseColor() {
    new EyeDropper()
      .open()
      .then((color: any) => (this.value = color.sRGBHex))
      .catch(() => {
        return;
      });
  }
}
