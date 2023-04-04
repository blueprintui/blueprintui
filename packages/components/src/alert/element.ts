import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, i18n, I18nService, typeClosable, TypeClosableController } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

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
 * @element bp-alert
 * @slot - slot for content
 * @event - close
 * @cssprop --icon-color
 * @cssprop --color
 */
@i18n<BpAlert>({ key: 'actions' })
@typeClosable<BpAlert>()
export class BpAlert extends LitElement {
  static styles = [baseStyles, styles];

  @property({ type: String, reflect: true }) status: 'accent' | 'success' | 'warning' | 'danger';

  @property({ type: Boolean }) closable = false;

  @property({ type: Object }) i18n = I18nService.keys.actions;

  private declare typeClosableController: TypeClosableController<this>;

  render() {
    return html`
      <div part="internal">
        <bp-icon part="icon" .shape=${statusIcon[this.status]} size="sm"></bp-icon>
        <slot></slot>
        ${this.closable
          ? html`<bp-button-icon
              @click=${() => this.typeClosableController?.close()}
              part="close"
              shape="close"
              aria-label=${this.i18n.close}></bp-button-icon>`
          : ''}
      </div>
    `;
  }
}
