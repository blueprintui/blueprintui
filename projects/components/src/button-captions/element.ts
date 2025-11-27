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

export interface BpButtonCaptions extends TypeFormControl {} // eslint-disable-line

/**
 * ```typescript
 * import '@blueprintui/components/include/button-captions.js';
 * ```
 *
 * ```html
 * <bp-button-captions aria-label="enable captions"></bp-button-captions>
 * ```
 *
 * @summary The button captions component provides a toggle control for closed captioning and subtitle display.
 * @element bp-button-captions
 * @since 2.10.0
 * @slot - slot for custom bp-icon
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border-color
 * @cssprop --border-radius
 * @cssprop --padding
 * @cssprop --background-hover
 * @cssprop --background-pressed
 * @cssprop --color-pressed
 * @cssprop --border-color-pressed
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
@stateActive<BpButtonCaptions>()
@typeFormControl<BpButtonCaptions>()
@interactionClick<BpButtonCaptions>()
@i18n<BpButtonCaptions>({ key: 'actions' })
@typeFormCheckbox<BpButtonCaptions>({ requireName: false })
export class BpButtonCaptions
  extends LitElement
  implements Pick<BpButtonCaptions, 'value' | 'checked' | 'readonly' | 'disabled' | 'i18n'>
{
  /** determines initial value of the control */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** determines whether element is checked (captions on) */
  @property({ type: Boolean }) accessor checked: boolean;

  @property({ type: Boolean }) accessor readonly: boolean;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) accessor disabled: boolean;

  /** represents the name of the current <form> element as a string. */
  declare name: string;

  @property({ type: Object }) accessor i18n: I18nStrings['actions'] = I18nService.keys.actions;

  static formAssociated = true;

  static styles = [baseStyles, interactionStyles, styles];

  render() {
    return html`
      <div part="button" interaction-after>
        <div part="icon">
          <slot>
            <bp-icon role="presentation" shape="captions" size="sm" .type=${this.checked ? 'solid' : ''}> </bp-icon>
          </slot>
        </div>
      </div>
    `;
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this._internals.role = 'button';
    this._internals.ariaLabel ??= this.i18n.captions;
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    if (props.has('checked')) {
      this._internals.ariaPressed = this.checked ? 'true' : 'false';
    }
  }
}
