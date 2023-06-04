import { html, LitElement } from 'lit';
import { state } from 'lit/decorators/state.js';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/shell.js';
 * ```
 *
 * ```html
 * <bp-shell></bp-shell>
 * ```
 *
 * @element bp-shell
 * @slot - slot for content
 */
export class BpShell extends LitElement {
  static styles = [baseStyles, styles];

  @property({ type: Number }) breakpoint = 1024;

  @property({ type: Boolean }) open = false;

  @state() private width = 0;

  get #nav() {
    return this.querySelector('bp-nav');
  }

  get #header() {
    return this.querySelector('bp-header');
  }

  get #drawerButton() {
    return this.#header?.querySelector<HTMLButtonElement>('[bp-shell="drawer-button"]');
  }

  render() {
    return html`
      <div part="internal" class=${this.width >= this.breakpoint ? 'app-breakpoint' : ''}>
        <slot name="header"></slot>
        ${this.width >= this.breakpoint
          ? html`<slot name="nav"></slot>`
          : html`<bp-drawer ?hidden=${!this.open} @close=${this.#close} closable><slot name="nav"></slot></bp-drawer>`}
        <main @scroll=${this.#scroll}>
          <slot></slot>
        </main>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.#nav) {
      this.#nav.slot = 'nav';
    }

    if (this.#header) {
      this.#header.slot = 'header';
    }

    new ResizeObserver(entries => {
      this.width = entries[0].contentRect.width;

      if (this.#drawerButton) {
        this.#drawerButton.hidden = this.width >= this.breakpoint;
      }
    }).observe(this);
  }

  #scroll() {
    this.dispatchEvent(new Event('scroll', { bubbles: true }));
  }

  #close() {
    // todo: should be stateless with event
    this.open = false; // eslint-disable-line
  }
}
