import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  BpTypeElement,
  i18n,
  I18nService,
  typeClosable,
  TypeClosableController
} from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

const statusIcon = {
  undefined: 'info',
  accent: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error'
};

/**
 * ```typescript
 * import '@blueprintui/components/include/alert.js';
 * ```
 *
 * ```html
 * <bp-alert status="success">alert</bp-alert>
 * ```
 *
 * @summary The alert component is used to inform users of important information or to provide feedback on an action they have taken.
 * @element bp-alert
 * @since 1.0.0
 * @slot - slot for content
 * @event - close
 * @event - open
 * @command --toggle
 * @command --close
 * @command --open
 * @cssprop --icon-color
 * @cssprop --color
 */
@i18n<BpAlert>({ key: 'actions' })
@typeClosable<BpAlert>()
export class BpAlert extends LitElement implements Pick<BpTypeElement, keyof BpAlert> {
  /** determine the visual status state */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  /** determine user closable state */
  @property({ type: Boolean }) accessor closable = false;

  /** determine user hidden state */
  @property({ type: Boolean, reflect: true }) accessor hidden = false; // eslint-disable-line rulesdir/no-reserved-property-names

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static styles = [baseStyles, styles];

  declare private typeClosableController: TypeClosableController<this>;

  render() {
    return html`
      <div part="internal">
        <slot name="icon"><bp-icon part="icon" .shape=${statusIcon[this.status]} size="sm"></bp-icon></slot>
        <slot></slot>
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.#close}
              part="close"
              shape="close"
              action="flat"
              aria-label=${this.i18n.close}></bp-button-icon>`
          : nothing}
      </div>
    `;
  }

  #close() {
    this.typeClosableController.close();
  }
}
