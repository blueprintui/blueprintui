import { html, LitElement, nothing, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { keynav } from '@blueprintui/typewriter';
import {
  baseStyles,
  BpTypeElement,
  getFlattenedFocusableItems,
  I18nService,
  interactionExpand,
  InteractionExpandController,
  stateExpanded,
  toggleState
} from '@blueprintui/components/internals';
import type { BpNavItem } from './item/element.js';
import type { BpNavGroup } from './group/element.js';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/nav.js';
 * ```
 *
 * ```html
 * <bp-nav></bp-nav>
 * ```
 *
 * @summary The Navigation component that allows users to navigate between different sections or pages. The component should contain links to different sections or pages within the application.
 * @element bp-nav
 * @since 1.0.0
 * @slot - content
 * @event open
 * @event close
 * @cssprop --background
 * @cssprop --padding
 * @cssprop --width
 * @cssprop --height
 * @cssprop --max-height
 */
@stateExpanded<BpNav>()
@interactionExpand<BpNav>()
@keynav<BpNav>((host: BpNav) => ({ direction: 'block', loop: true, grid: host.focusItems.map(item => [item]) }))
export class BpNav extends LitElement implements Pick<BpTypeElement, keyof Omit<BpNav, 'focusItems'>> {
  /** Controls whether the navigation is expanded, showing all items and content */
  @property({ type: Boolean }) accessor expanded = false;

  /** Determines if the navigation can be expanded or collapsed by the user */
  @property({ type: Boolean }) accessor expandable = false;

  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  /** Controls whether the component automatically manages expanded state based on user interactions */
  @property({ type: String }) accessor interaction: 'auto';

  static styles = [baseStyles, styles];

  /** @private */
  get focusItems() {
    return getFlattenedFocusableItems(this).filter((i: any) => i.tagName === 'BP-NAV-ITEM');
    // todo: filter out collapsed items
  }

  get #items() {
    return Array.from(this.querySelectorAll<BpNavItem>('bp-nav-item')).filter((i: any) => i.disabled !== true);
  }

  get #groups() {
    return Array.from(this.querySelectorAll<BpNavGroup>('bp-nav-group')).filter((i: any) => i.disabled !== true);
  }

  /** @private */
  declare _internals?: ElementInternals;

  /** @private */
  declare private interactionExpandController: InteractionExpandController<this>;

  render() {
    return html`
      <div part="internal" role="presentation">
        ${this.expandable
          ? html` <bp-nav-item @click=${this.#change} aria-label=${this.expanded ? this.i18n.close : this.i18n.expand}>
              <bp-icon shape="angle" .direction=${this.expanded ? 'left' : 'right'}></bp-icon>
            </bp-nav-item>`
          : nothing}
        <slot layer></slot>
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'tree';
    await this.updateComplete;
    await Promise.all(Array.from(this.#items).map(i => i.updateComplete));
    this.#setupScrollPositioning();
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this.#items.forEach(i => toggleState(i._internals, 'group-expanded', this.expanded));
    if (this.interaction === 'auto') {
      this.#syncInteractions();
    }
  }

  #syncInteractions() {
    this.#groups.forEach(i => {
      i.interaction = this.interaction;
      i.expanded = !this.expanded ? false : i.expanded;
    });
  }

  #change() {
    if (this.expanded) {
      this.interactionExpandController.close();
    } else {
      this.interactionExpandController.open();
    }
  }

  async #setupScrollPositioning() {
    const container = this.shadowRoot.querySelector('[part=internal]');
    const key = this.id ? `${this.id}-bp-nav-scroll-position` : 'bp-nav-scroll-position';
    const top = localStorage.getItem(key);

    if (top !== null) {
      setTimeout(() => (container.scrollTop = parseInt(top, 10)), 0);
    }

    container.addEventListener('scrollend', () => localStorage.setItem(key, `${container.scrollTop}`));
  }
}
