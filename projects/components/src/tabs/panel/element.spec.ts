import { html } from 'lit';
import '@blueprintui/components/include/tabs.js';
import { BpTabPanel, BpTab } from '@blueprintui/components/tabs';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-tab-panel', () => {
  let fixture: HTMLElement;
  let element: BpTabPanel;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-tab-panel>panel content</bp-tab-panel>`);
    element = fixture.querySelector<BpTabPanel>('bp-tab-panel');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-tab-panel')).toBe(BpTabPanel);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('panel content');
  });

  it('should have proper ARIA role', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('tabpanel');
  });

  it('should assign tabpanel slot', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('tabpanel');
  });

  it('should render slot content', async () => {
    fixture = await createFixture(html`
      <bp-tab-panel>
        <div>panel content</div>
        <p>more content</p>
      </bp-tab-panel>
    `);
    element = fixture.querySelector<BpTabPanel>('bp-tab-panel');
    await elementIsStable(element);

    expect(element.innerHTML).toContain('panel content');
    expect(element.innerHTML).toContain('more content');
  });

  it('should have internal part', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
  });

  it('should set aria-describedby when tab is assigned', async () => {
    fixture = await createFixture(html`
      <bp-tabs>
        <bp-tab-list>
          <bp-tab id="tab1">Tab 1</bp-tab>
        </bp-tab-list>
        <bp-tab-panel>Panel 1</bp-tab-panel>
      </bp-tabs>
    `);
    element = fixture.querySelector<BpTabPanel>('bp-tab-panel');
    const tab = fixture.querySelector<BpTab>('bp-tab');
    await elementIsStable(element);

    // Simulate tab assignment
    (element as any).tab = tab;
    await elementIsStable(element);

    expect(element.getAttribute('aria-describedby')).toBe(tab.id);
  });

  it('should handle tab property changes', async () => {
    const mockTab = document.createElement('bp-tab') as BpTab;
    mockTab.id = 'test-tab-id';

    element.tab = mockTab;
    await elementIsStable(element);

    expect(element.getAttribute('aria-describedby')).toBe('test-tab-id');
  });
});
