import { html, LitElement, nothing, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  i18n,
  I18nService,
  Position,
  stateScrollLock,
  attachRootNodeStyles,
  attachInternals,
  typePopover,
  BpTypePopover
} from '@blueprintui/components/internals';
import globalStyles from './element.global.css' with { type: 'css' };
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/dialog.js';
 * ```
 *
 * ```html
 * <bp-dialog>
 *
 * </bp-dialog>
 * ```
 *
 * @summary The dialog component is used to display content in a overlay that appears on top of the current view. It is used to display information that requires the user's attention or interaction.
 * @element bp-dialog
 * @since 1.0.0
 * @event open - dispatched when the dialog is opened
 * @event close - dispatched when the dialog is closed
 * @command --toggle-popover
 * @command --show-popover
 * @command --hide-popover
 * @slot - slot for dialog content
 * @slot header - slot for dialog header
 * @slot footer - slot for dialog footer
 * @cssprop --padding
 * @cssprop --filter
 * @cssprop --background
 * @cssprop --color
 * @cssprop --width
 * @cssprop --height
 * @cssprop --min-width
 * @cssprop --min-height
 * @cssprop --font-size
 * @cssprop --animation-duration
 */
@stateScrollLock<BpDialog>()
@i18n<BpDialog>({ key: 'actions' })
@typePopover<BpDialog>(host => ({
  focusTrap: host.modal,
  open: host.open,
  type: host.modal ? 'auto' : 'manual'
}))
export class BpDialog extends LitElement implements Pick<BpTypePopover, keyof BpDialog> {
  /** Determines the visual size variant of the dialog, affecting width and content scaling */
  @property({ type: String, reflect: true }) accessor size: 'sm' | 'md' | 'lg';

  /** Controls the position of the dialog relative to the viewport */
  @property({ type: String, reflect: true }) accessor position: Position = 'center';

  /** Controls whether the dialog displays a close button, allowing users to dismiss it */
  @property({ type: Boolean }) accessor closable = false;

  /** Controls whether the dialog is modal with a backdrop layer that prevents interaction with underlying content */
  @property({ type: Boolean, reflect: true }) accessor modal = false;

  /** Controls whether the dialog is visible and open on initialization */
  @property({ type: Boolean, reflect: true }) accessor open = false;

  /** Provides internationalization strings for accessibility labels and screen reader announcements */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  static styles = [baseStyles, styles];

  /** @private */
  _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.hidePopover}
              aria-label=${this.i18n.close}
              shape="close"
              action="inline"
              type="button"></bp-button-icon>`
          : nothing}
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.states.add('bp-layer');
    attachRootNodeStyles(this, [globalStyles]);
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this._internals.ariaModal = `${this.modal}`;
    this._internals.states.add('bp-layer');
  }
}
