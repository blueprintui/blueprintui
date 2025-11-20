import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { keynav } from '@blueprintui/typewriter';
import { assignedElements, baseStyles, BpTypeElement, createId } from '@blueprintui/components/internals';
import { BpTab } from './tab/element.js';
import { BpTabPanel } from './panel/element.js';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/tabs.js';
 * ```
 *
 * ```html
 * <bp-tabs></bp-tabs>
 * ```
 *
 * @summary The tabs component is used to display a group of related content in a tabbed interface. The tabs component consists of a collection of tabs, where each tab represents a different piece of content.
 * @element bp-tabs
 * @since 1.0.0
 * @slot
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border-radius
 * @cssprop --padding
 */
@keynav<BpTabs>((host: BpTabs) => {
  const grid = host.layout === 'horizontal' ? [host.tabs] : host.tabs.map(tab => [tab]);
  const direction = host.layout === 'horizontal' ? 'inline' : 'block';
  return { direction, grid, loop: true };
})
export class BpTabs extends LitElement implements Pick<BpTypeElement, keyof Omit<BpTabs, 'tabs'>> {
  /** Controls the layout direction of the tabs, either horizontal or vertical */
  @property({ type: String }) accessor layout: 'horizontal' | 'vertical' = 'horizontal';

  static styles = [baseStyles, styles];

  /** @private */
  get tabs() {
    return Array.from(this.querySelectorAll<BpTab>('bp-tab')).filter(i => i.disabled !== true);
  }

  get #tabPanels() {
    return assignedElements<BpTabPanel>(this, { name: 'tabpanel' });
  }

  render() {
    return html`
      <div part="internal">
        <slot name="tablist" @slotchange=${this.#updateTabs}></slot>
        <div>
          <slot name="tabpanel" @slotchange=${this.#updateTabs}></slot>
        </div>
      </div>
    `;
  }

  #updateTabs() {
    this.tabs?.forEach((tab, i) => {
      tab.id = createId();
      tab.tabPanel = this.#tabPanels[i];
      this.#tabPanels[i].tab = tab;
    });
  }
}
