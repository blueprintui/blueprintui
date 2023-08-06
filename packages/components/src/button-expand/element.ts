import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { i18n, I18nService, I18nStrings, interactionClick, stateActive } from '@blueprintui/components/internals';
import { typeFormCheckbox, typeFormControl, TypeFormControl } from '@blueprintui/components/forms';
import { buttonIconStyles } from '@blueprintui/components/button-icon';
import styles from './element.css' assert { type: 'css' };

export interface BpButtonExpand extends TypeFormControl {} // eslint-disable-line

/**
 * Expand Button
 *
 * ```typescript
 * import '@blueprintui/components/include/button-expand.js';
 * ```
 *
 * ```html
 * <bp-button-expand expanded></bp-button-expand>
 * ```
 *
 * @element bp-button-expand
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
export class BpButtonExpand extends LitElement {
  /** determines initial value of the control */
  @property({ type: String, reflect: true }) value = 'on';

  /** determines whether element is checked */
  @property({ type: Boolean, reflect: true }) checked: boolean;

  @property({ type: Boolean }) readonly: boolean;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) disabled: boolean;

  @property({ type: String }) action: 'vertical' | 'horizontal' = 'vertical';

  @property({ type: Object }) i18n: I18nStrings['actions'] = I18nService.keys.actions;

  static formAssociated = true;

  static get styles() {
    return [buttonIconStyles, styles];
  }

  get #iconDirection() {
    if (this.action === 'vertical') {
      return this.checked ? 'down' : 'right';
    } else if (this.action === 'horizontal') {
      return this.checked ? 'left' : 'right';
    } else {
      return null;
    }
  }

  render() {
    return html`
      <div part="internal">
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
