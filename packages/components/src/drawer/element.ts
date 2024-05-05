import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  I18nService,
  stateScrollLock,
  attachInternals,
  typePopover,
  BpTypePopover
} from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/drawer.js';
 * ```
 *
 * ```html
 * <bp-drawer></bp-drawer>
 * ```
 *
 * @element bp-drawer
 * @since 1.0.0
 * @event open - dispatched when the drawer is opened
 * @event close - dispatched when the drawer is closed
 * @slot - slot for drawer content
 * @cssprop --background
 * @cssprop --padding
 * @cssprop --width
 * @cssprop --height
 * @cssprop --overflow
 */
@stateScrollLock<BpDrawer>()
@typePopover<BpDrawer>(host => ({
  trigger: host.trigger,
  focusTrap: true,
  type: 'auto'
}))
export class BpDrawer extends LitElement implements Pick<BpTypePopover, keyof BpDrawer> {
  /** determine if the drawer has a close button */
  @property({ type: Boolean }) accessor closable = false;

  @property({ type: String }) accessor trigger: HTMLElement | string;

  /** determines drawer position relative to viewport */
  @property({ type: String, reflect: true }) accessor position: 'left' | 'right' = 'left';

  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.hidePopover}
              aria-label=${this.i18n.close}
              shape="close"
              action="flat"
              type="button"></bp-button-icon>`
          : nothing}
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.states.add('bp-layer');
  }
}
