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
  /** Defines the visual status type of the alert, affecting its color, icon, and semantic meaning */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  /** Controls whether the alert displays a close button, allowing users to dismiss it */
  @property({ type: Boolean }) accessor closable = false;

  /** Controls the visibility state of the alert, hiding it from view when set to true */
  @property({ type: Boolean, reflect: true }) accessor hidden = false; // eslint-disable-line rules/no-reserved-property-names

  /** Provides internationalization strings for accessibility labels and screen reader announcements */
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
