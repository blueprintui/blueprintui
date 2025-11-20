import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  attachInternals,
  attachRootNodeStyles,
  baseStyles,
  BpTypeElement,
  I18nService,
  typeClosable,
  TypeClosableController
} from '@blueprintui/components/internals';
import globalStyles from './element.global.css' with { type: 'css' };
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/badge.js';
 * ```
 *
 * ```html
 * <bp-panel>panel content</bp-panel>
 * ```
 *
 * @summary The panel component is used to display secondary information, commonly navigation or actions.
 * @element bp-panel
 * @since 1.0.0
 * @slot - content
 * @slot header
 * @slot footer
 * @event - close
 * @event - open
 * @command --toggle
 * @command --close
 * @command --open
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border
 * @cssprop --padding
 */
@typeClosable<BpPanel>()
export class BpPanel extends LitElement implements Pick<BpTypeElement, keyof BpPanel> {
  static styles = [baseStyles, styles];

  /** Determines the size variant of the panel for different visual hierarchies */
  @property({ type: String, reflect: true }) accessor size: 'sm' | 'md' | 'lg';

  /** Determines whether a close button is displayed for dismissing the panel */
  @property({ type: Boolean }) accessor closable = false;

  /** Controls the visibility state of the panel */
  @property({ type: Boolean, reflect: true }) accessor hidden = false; // eslint-disable-line rules/no-reserved-property-names

  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  declare _internals: ElementInternals;

  declare private typeClosableController: TypeClosableController<this>;

  render() {
    return html`
      <div part="internal">
        ${this.closable
          ? html`<bp-button-icon
              @click=${this.#close}
              aria-label=${this.i18n.close}
              shape="close"
              action="flat"
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
    this._internals.role = 'region';
    this._internals.states.add('bp-layer');
    attachRootNodeStyles(this, [globalStyles]);
  }

  #close() {
    this.typeClosableController.close();
  }
}
