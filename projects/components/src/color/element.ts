import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

interface EyeDropperResult {
  sRGBHex: string;
}

interface EyeDropperConstructor {
  new (): {
    open(): Promise<EyeDropperResult>;
  };
}

declare const EyeDropper: EyeDropperConstructor;

declare global {
  interface Window {
    EyeDropper?: EyeDropperConstructor;
  }

  var EyeDropper: EyeDropperConstructor | undefined;
}

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
 * @slot suffix - slot for suffiix text or icons
 * @cssprop --background
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpColor extends BpInput implements Pick<BpTypeControl, keyof BpColor> {
  /** Defines the input type as color, enabling color picker functionality */
  @property({ type: String, reflect: true }) accessor type = 'color';

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`<bp-button-icon
      shape="color-picker"
      .disabled=${this.disabled}
      ?readonly=${!globalThis.EyeDropper}
      action="inline"
      @click=${this.#chooseColor}></bp-button-icon>`;
  }

  #chooseColor() {
    new EyeDropper()
      .open()
      .then((result: EyeDropperResult) => (this.value = result.sRGBHex))
      .catch(() => {
        return;
      });
  }
}
