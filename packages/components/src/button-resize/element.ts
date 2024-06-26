import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import { FormControl, TypeFormSliderController } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };

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
 * @since 1.0.0
 * @cssprop --background
 * @cssprop --width
 * @cssprop --height
 */
export class BpButtonResize extends FormControl implements Pick<BpTypeControl, keyof BpButtonResize> {
  /** determines initial value of the control */
  @property({ type: Number }) accessor value = 50;

  /** defines the most negative value in the range of permitted values */
  @property({ type: Number }) accessor min = 0;

  /** defines the greatest value in the range of permitted values */
  @property({ type: Number }) accessor max = 100;

  /** number that specifies the granularity that the value */
  @property({ type: Number }) accessor step = 1;

  @property({ type: String }) accessor orientation: 'vertical' | 'horizontal' = 'horizontal';

  protected typeFormSliderController = new TypeFormSliderController<BpButtonResize>(this);

  static formAssociated = true;

  static styles = [baseStyles, styles];

  render() {
    return html` <div part="internal"></div> `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.states.delete('bp-layer'); // override default form control layering
  }
}
