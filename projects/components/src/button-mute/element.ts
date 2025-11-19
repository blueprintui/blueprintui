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

export interface BpButtonMute extends TypeFormControl {} // eslint-disable-line

/**
 * ```typescript
 * import '@blueprintui/components/include/button-mute.js';
 * ```
 *
 * ```html
 * <bp-button-mute aria-label="mute audio"></bp-button-mute>
 * ```
 *
 * @summary The button mute component provides a toggle control for audio mute states.
 * @element bp-button-mute
 * @since 2.11.0
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
 * @event {Event} change - occurs when the value changes
 */
@stateActive<BpButtonMute>()
@typeFormControl<BpButtonMute>()
@interactionClick<BpButtonMute>()
@i18n<BpButtonMute>({ key: 'actions' })
@typeFormCheckbox<BpButtonMute>({ requireName: true })
export class BpButtonMute
  extends LitElement
  implements Pick<BpButtonMute, 'value' | 'checked' | 'readonly' | 'disabled' | 'i18n'>
{
  /** determines initial value of the control */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** determines whether element is checked (muted) */
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
            ${this.checked
              ? html`<bp-icon role="presentation" shape="volume-mute" size="md"></bp-icon>`
              : html`<bp-icon role="presentation" shape="volume" size="md"></bp-icon>`}
          </slot>
        </div>
      </div>
    `;
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this._internals.role = 'button';
    this._internals.ariaLabel ??= this.i18n.mute;
  }
}
