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

export interface BpButtonPlay extends TypeFormControl {} // eslint-disable-line

/**
 * ```typescript
 * import '@blueprintui/components/include/button-play.js';
 * ```
 *
 * ```html
 * <bp-button-play aria-label="play audio"></bp-button-play>
 * ```
 *
 * @summary The button play component provides a toggle control for media playback states (play/pause).
 * @element bp-button-play
 * @since 2.11.0
 * @slot - slot for custom play/pause icons
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border-color
 * @cssprop --border-radius
 * @cssprop --padding
 * @cssprop --background-hover
 * @cssprop --background-pressed
 * @cssprop --color-pressed
 * @cssprop --border-color-pressed
 */
@stateActive<BpButtonPlay>()
@typeFormControl<BpButtonPlay>()
@interactionClick<BpButtonPlay>()
@i18n<BpButtonPlay>({ key: 'actions' })
@typeFormCheckbox<BpButtonPlay>({ requireName: true })
export class BpButtonPlay
  extends LitElement
  implements Pick<BpButtonPlay, 'value' | 'checked' | 'readonly' | 'disabled' | 'i18n'>
{
  /** determines initial value of the control */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** determines whether element is checked (playing) */
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
        <slot>
          ${this.checked
            ? html`<bp-icon part="icon" shape="pause" size="sm"></bp-icon>`
            : html`<bp-icon part="icon" shape="play" size="sm"></bp-icon>`}
        </slot>
      </div>
    `;
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);
    this._internals.role = 'button';
    this._internals.ariaLabel ??= this.checked ? this.i18n.pause : this.i18n.play;
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    if (props.has('checked')) {
      this._internals.ariaPressed = this.checked ? 'true' : 'false';
      // Update aria-label based on checked state if no custom label is set
      if (!this.hasAttribute('aria-label') && !this.hasAttribute('aria-labelledby')) {
        this._internals.ariaLabel = this.checked ? this.i18n.pause : this.i18n.play;
      }
    }
  }
}
