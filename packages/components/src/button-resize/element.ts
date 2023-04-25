import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { FormControl, TypeFormSliderController } from '@blueprintui/components/forms';
import styles from './element.css' assert { type: 'css' };

/**
 * Button Resize
 *
 * ```typescript
 * import '@blueprintui/components/include/button-reisze.js';
 * ```
 *
 * ```html
 * <bp-button-resize></bp-button-resize>
 * ```
 *
 * @element bp-button-resize
 * @cssprop --background
 * @cssprop --width
 * @cssprop --height
 */
export class BpButtonResize extends FormControl {
  static formAssociated = true;

  @property({ type: Number }) value = 50;

  @property({ type: Number }) min = 0;

  @property({ type: Number }) max = 100;

  @property({ type: Number }) step = 1;

  @property({ type: String }) direction: 'vertical' | 'horizontal' = 'horizontal';

  protected typeFormSliderController = new TypeFormSliderController<BpButtonResize>(this);

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html` <div part="internal"></div> `;
  }
}
