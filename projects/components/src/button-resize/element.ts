import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import { FormControl, TypeFormSliderController } from '@blueprintui/components/forms';
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
export class BpButtonResize extends FormControl implements Pick<BpTypeControl, keyof BpButtonResize> {
  /** Defines the current resize position value, used for form submission and keyboard navigation */
  @property({ type: Number }) accessor value = 50;

  /** Defines the minimum allowed value for the resize control */
  @property({ type: Number }) accessor min = 0;

  /** Defines the maximum allowed value for the resize control */
  @property({ type: Number }) accessor max = 100;

  /** Specifies the granularity of value changes when using keyboard navigation */
  @property({ type: Number }) accessor step = 1;

  /** Controls the layout direction of the resize handle, either horizontal or vertical */
  @property({ type: String, reflect: true }) accessor orientation: 'vertical' | 'horizontal' = 'horizontal';

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
