import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  i18n,
  I18nService,
  I18nStrings,
  interactionClick,
  interactionStyles,
  stateActive
} from '@blueprintui/components/internals';
import { typeFormCheckbox, typeFormControl, TypeFormControl } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };

export interface BpButtonExpand extends TypeFormControl {} // eslint-disable-line

/**
 * ```typescript
 * import '@blueprintui/components/include/button-expand.js';
 * ```
 *
 * ```html
 * <bp-button-expand expanded></bp-button-expand>
 * ```
 *
 * @summary The expand button component is used to reveal and hide additional content, such as a dropdown menu or a nested list.
 * @element bp-button-expand
 * @since 1.0.0
 * @slot - slot for custom bp-icon
 * @cssprop --animation-duration
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
@stateActive<BpButtonExpand>()
@typeFormControl<BpButtonExpand>()
@interactionClick<BpButtonExpand>()
@i18n<BpButtonExpand>({ key: 'actions' })
@typeFormCheckbox<BpButtonExpand>({ requireName: true })
export class BpButtonExpand
  extends LitElement
  implements Pick<BpButtonExpand, 'value' | 'checked' | 'readonly' | 'disabled' | 'orientation' | 'i18n'>
{
  /** determines initial value of the control */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** determines whether element is checked */
  @property({ type: Boolean }) accessor checked: boolean;

  @property({ type: Boolean }) accessor readonly: boolean;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) accessor disabled: boolean;

  @property({ type: String }) accessor orientation: 'vertical' | 'horizontal' = 'vertical';

  @property({ type: Object }) accessor i18n: I18nStrings['actions'] = I18nService.keys.actions;

  static formAssociated = true;

  static styles = [baseStyles, interactionStyles, styles];

  get #iconDirection() {
    if (this.orientation === 'vertical') {
      return this.checked ? 'down' : 'right';
    } else if (this.orientation === 'horizontal') {
      return this.checked ? 'left' : 'right';
    } else {
      return null;
    }
  }

  render() {
    return html`
      <div part="internal" interaction-after>
        <slot><bp-icon role="presentation" shape="angle" size="sm" .direction=${this.#iconDirection}></bp-icon></slot>
      </div>
    `;
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this._internals.role = 'switch';
    this._internals.ariaLabel ??= this.i18n.expand;
  }
}
