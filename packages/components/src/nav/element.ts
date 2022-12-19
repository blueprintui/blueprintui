import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ariaNavigation, baseStyles, elevationStyles, I18nService, keyList, layerStyles, stateExpanded, toggleState } from '@blueprintui/components/internals';
import { BpNavItem } from './item/element.js';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/nav.js';
 * ```
 *
 * ```html
 * <bp-nav></bp-nav>
 * ```
 *
 * @element bp-nav
 * @slot - content
 * @event change
 * @cssprop --background
 * @cssprop --padding
 * @cssprop --width
 * @cssprop --height
 * @cssprop --max-height
 */
@stateExpanded<BpNav>()
@ariaNavigation<BpNav>()
@keyList<BpNav>(host => ({ layout: 'both', loop: true, items: host.items }))
export class BpNav extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ type: Boolean, reflect: true }) expandable = false;

  @property({ type: Object }) i18n = I18nService.keys.actions;

  static get styles() {
    return [baseStyles, elevationStyles, layerStyles, styles];
  }

  get items() {
    return this.querySelectorAll<BpNavItem>('bp-nav-item');
  }

  render() {
    return html`
      <div elevation part="internal">
        ${this.expandable ? html`
          <bp-nav-item @click=${this.#change} aria-label=${this.expanded ? this.i18n.close : this.i18n.expand}>
            <bp-icon shape="angle" .direction=${this.expanded ? 'left' : 'right'}></bp-icon>
          </bp-nav-item>` : ''}
        <slot layer></slot>
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.#setupScrollPositioning();
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this.items.forEach(i => toggleState(i._internals, '--group-expanded', this.expanded));
  }

  #change() {
    this.dispatchEvent(new CustomEvent('change', { detail: this.expanded }));
  }

  async #setupScrollPositioning() {
    const container = this.shadowRoot.querySelector('[part=internal]');
    const key = this.id ? `${this.id}-bp-nav-scroll-position` : 'bp-nav-scroll-position';

    await Promise.all(Array.from(this.items).map(i => i.updateComplete));

    const top = localStorage.getItem(key);
    if (top !== null) {
      setTimeout(() => container.scrollTop = parseInt(top, 10), 0);
    }

    this.addEventListener('pointerdown', () => localStorage.setItem(key, `${container.scrollTop}`));
    window.addEventListener('beforeunload', () => localStorage.setItem(key, `${container.scrollTop}`));
  }
}
