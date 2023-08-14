import { html, LitElement } from 'lit';
import { state } from 'lit/decorators/state.js';
import { property } from 'lit/decorators/property.js';
import { baseStyles, interactionClose, InteractionCloseController } from '@blueprintui/components/internals';
import type { BpNav } from '@blueprintui/components/nav';
import type { BpHeader } from '@blueprintui/components/header';
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
 * @since 1.0.0
 * @event open - dispatched when the drawer is opened
 * @event close - dispatched when the drawer is closed
 * @slot - slot for content
 */
@interactionClose<BpShell>()
export class BpShell extends LitElement {
  static styles = [baseStyles, styles];

  @property({ type: Number }) breakpoint = 1024;

  @property({ type: Boolean }) open = false;

  @property({ type: String }) interaction: 'auto';

  /** determine user closable state */
  @property({ type: Boolean }) closable = false;

  @state() private width = 0;

  get #nav() {
    return this.querySelector<BpNav>('bp-nav');
  }

  get #header() {
    return this.querySelector<BpHeader>('bp-header');
  }

  get #drawerButton() {
    return this.#header?.querySelector<HTMLButtonElement>('[bp-shell="drawer-button"]');
  }

  private declare interactionCloseController: InteractionCloseController<this>;

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
        this.#drawerButton.addEventListener('click', () => {
          if (this.interaction === 'auto') {
            this.open = true; // eslint-disable-line
          }
        });
      }
    }).observe(this);
  }

  #scroll() {
    this.dispatchEvent(new Event('scroll', { bubbles: true }));
  }

  #close() {
    this.interactionCloseController.close();
    if (this.interaction === 'auto') {
      this.open = false; // eslint-disable-line
    }
  }
}
