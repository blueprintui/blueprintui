import { html } from 'lit';
import '@blueprintui/components/include/tabs.js';
import { BpTab, BpTabList, BpTabPanel, BpTabs } from '@blueprintui/components/tabs';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('bp-tabs', () => {
  let fixture: HTMLElement;
  let element: BpTabs;
  let tabList: BpTabList;
  let tabs: NodeListOf<BpTab>;
  let panels: NodeListOf<BpTabPanel>;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-tabs>
        <bp-tab-list aria-label="example tablist">
          <bp-tab selected>item one</bp-tab>
          <bp-tab>item two</bp-tab>
          <bp-tab>item three</bp-tab>
        </bp-tab-list>
        <bp-tab-panel>panel one</bp-tab-panel>
        <bp-tab-panel>panel two</bp-tab-panel>
        <bp-tab-panel>panel three</bp-tab-panel>
      </bp-tabs>
    `);
    element = fixture.querySelector<BpTabs>('bp-tabs');
    tabList = fixture.querySelector<BpTabList>('bp-tab-list');
    tabs = fixture.querySelectorAll<BpTab>('bp-tab');
    panels = fixture.querySelectorAll<BpTabPanel>('bp-tab-panel');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-tabs')).toBe(BpTabs);
  });

  it('should sync the layout to the tablist and tab components', async () => {
    await elementIsStable(element);
    expect(element.layout).toBe('horizontal');
    expect(tabList._layout).toBe('horizontal');
    expect(tabs[0]._layout).toBe('horizontal');

    element.layout = 'vertical';
    await elementIsStable(element);
    expect(element.layout).toBe('vertical');
    expect(tabList._layout).toBe('vertical');
    expect(tabs[0]._layout).toBe('vertical');
  });

  it('should assign an id to each bp-tab', async () => {
    await elementIsStable(element);
    expect(tabs[0].id.includes('_')).toBe(true);
    expect(tabs[1].id.includes('_')).toBe(true);
    expect(tabs[2].id.includes('_')).toBe(true);
  });

  it('should assign each tab a tab panel', async () => {
    await elementIsStable(element);
    expect(tabs[0].tabPanel).toBe(panels[0]);
    expect(tabs[1].tabPanel).toBe(panels[1]);
    expect(tabs[2].tabPanel).toBe(panels[2]);

    expect(panels[0].tab).toBe(tabs[0]);
    expect(panels[1].tab).toBe(tabs[1]);
    expect(panels[2].tab).toBe(tabs[2]);
  });

  it('should assign a11y roles to tablist', async () => {
    await elementIsStable(element);
    expect((tabList as any)._internals.role).toBe('tablist');
  });

  it('should assign tablist to appropriate slot', async () => {
    await elementIsStable(element);
    expect(tabList.slot).toBe('tablist');
  });

  it('should assign a11y roles to tabpanel', async () => {
    await elementIsStable(element);
    expect((panels[0] as any)._internals.role).toBe('tabpanel');
    expect((panels[1] as any)._internals.role).toBe('tabpanel');
    expect((panels[2] as any)._internals.role).toBe('tabpanel');
  });

  it('should assign tablist to appropriate slot', async () => {
    await elementIsStable(element);
    expect(panels[0].slot).toBe('tabpanel');
    expect(panels[1].slot).toBe('tabpanel');
    expect(panels[2].slot).toBe('tabpanel');
  });

  it('should assign tablist to appropriate slot', async () => {
    await elementIsStable(element);
    expect(panels[0].getAttribute('aria-describedby')).toBe(tabs[0].id);
    expect(panels[1].getAttribute('aria-describedby')).toBe(tabs[1].id);
    expect(panels[2].getAttribute('aria-describedby')).toBe(tabs[2].id);
  });

  it('should assign a11y roles to tab', async () => {
    await elementIsStable(element);
    expect((tabs[0] as any)._internals.role).toBe('tab');
    expect((tabs[1] as any)._internals.role).toBe('tab');
    expect((tabs[2] as any)._internals.role).toBe('tab');

    expect((tabs[0] as any)._internals.ariaSelected).toBe('true');
    expect((tabs[1] as any)._internals.ariaSelected).toBe('false');
    expect((tabs[2] as any)._internals.ariaSelected).toBe('false');

    expect(panels[0].hidden).toBe(false);
    expect(panels[1].hidden).toBe(true);
    expect(panels[2].hidden).toBe(true);
  });
});
