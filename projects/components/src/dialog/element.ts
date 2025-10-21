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
import type { BpDialogEventMap } from '@blueprintui/components/internals/events';
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
  /** determine the visual size state */
  @property({ type: String, reflect: true }) accessor size: 'sm' | 'md' | 'lg';

  /** determine the position relative to the viewport */
  @property({ type: String, reflect: true }) accessor position: Position = 'center';

  /** determine user closable state */
  @property({ type: Boolean }) accessor closable = false;

  /** determine if dialog is modal with a backdrop layer */
  @property({ type: Boolean, reflect: true }) accessor modal = false;

  /** default popover to open on intialization */
  @property({ type: Boolean, reflect: true }) accessor open = false;

  /** set default aria/i18n strings */
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

// Declaration merging for strongly typed events
export interface BpDialog {
  addEventListener<K extends keyof BpDialogEventMap>(
    type: K,
    listener: (this: BpDialog, ev: BpDialogEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof BpDialogEventMap>(
    type: K,
    listener: (this: BpDialog, ev: BpDialogEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}
