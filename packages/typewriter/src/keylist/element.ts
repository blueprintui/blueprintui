import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { keyList } from '../internals/controllers/key-list.controller.js';
import { getFlattenedFocusableItems } from '../internals/utils/traversal.js';

/**
 * @element bp-keylist
 * @slot - content
 */
@keyList<BpKeylist>(host => ({
  loop: host.loop,
  items: host.items,
  direction: host.direction
}))
export class BpKeylist extends LitElement {
  @property({ type: String }) direction: 'inline' | 'block' | 'all' = 'all';

  @property({ type: Boolean }) loop: boolean;

  static styles = [css`
    :host,
    slot {
      display: contents;
    }
  `];

  private get items() {
    return getFlattenedFocusableItems(this);
  }

  #internals = this.attachInternals();

  render() {
    return html`<slot role="presentation"></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#internals.role = 'presentation';
  }
}
