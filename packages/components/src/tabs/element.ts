import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { keynav } from '@blueprintui/typewriter';
import { baseStyles, createId, elevationStyles } from '@blueprintui/components/internals';
import { BpTab } from './tab/element.js';
import { BpTabPanel } from './panel/element.js';
import { BpTabList } from './list/element.js';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/tabs.js';
 * ```
 *
 * ```html
 * <bp-tabs></bp-tabs>
 * ```
 *
 * @element bp-tabs
 * @slot
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border-radius
 * @cssprop --padding
 */
@keynav<BpTabs>(host => {
  const grid = host.layout === 'horizontal' ? [host.tabs] : host.tabs.map(tab => [tab]);
  const direction = host.layout === 'horizontal' ? 'inline' : 'block';
  return { direction, grid, loop: true };
})
export class BpTabs extends LitElement {
  @property({ type: String }) layout: 'horizontal' | 'vertical' = 'horizontal';

  static styles = [baseStyles, elevationStyles, styles];

  get tabs() {
    return Array.from(this.querySelectorAll<BpTab>('bp-tab')).filter((i: any) => i.disabled !== true);
  }

  get #tabList() {
    return this.querySelector<BpTabList>('bp-tab-list');
  }

  get #tabPanels() {
    return Array.from(this.querySelectorAll<BpTabPanel>('bp-tab-panel'));
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

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this.#tabList._layout = this.layout;
    this.tabs.forEach(tab => (tab._layout = this.layout));
  }

  #updateTabs() {
    this.tabs.forEach((tab, i) => {
      tab.id = createId();
      tab.tabPanel = this.#tabPanels[i];
      this.#tabPanels[i].tab = tab;
    });
  }
}
