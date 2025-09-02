import { html } from 'lit';
import '@blueprintui/components/include/tabs.js';
import { BpTab, BpTabPanel } from '@blueprintui/components/tabs';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';

describe('bp-tab', () => {
  let fixture: HTMLElement;
  let element: BpTab;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-tab>tab content</bp-tab>`);
    element = fixture.querySelector<BpTab>('bp-tab');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-tab')).toBe(BpTab);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('tab content');
  });

  it('should have proper ARIA role', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('tab');
  });

  it('should default to not selected', async () => {
    await elementIsStable(element);
    expect(element.selected).toBe(false);
    expect((element as any)._internals.ariaSelected).toBe('false');
  });

  it('should handle selected state', async () => {
    await elementIsStable(element);
    element.selected = true;
    await elementIsStable(element);

    expect(element.selected).toBe(true);
    expect(element.getAttribute('selected')).toBe('');
    expect((element as any)._internals.ariaSelected).toBe('true');
  });

  it('should be focusable', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should handle click events', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'click');
    element.click();
    expect(await event).toBeTruthy();
  });

  it('should handle keyboard events', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'keydown');
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(await event).toBeTruthy();
  });

  it('should have interaction part', async () => {
    await elementIsStable(element);
    const interaction = element.shadowRoot?.querySelector('[interaction]');
    expect(interaction).toBeTruthy();
  });

  it('should handle tab panel association', async () => {
    const mockPanel = document.createElement('bp-tab-panel') as BpTabPanel;

    element.tabPanel = mockPanel;
    await elementIsStable(element);

    expect(element.tabPanel).toBe(mockPanel);
  });

  it('should hide associated panel when not selected', async () => {
    const mockPanel = document.createElement('bp-tab-panel') as BpTabPanel;
    mockPanel.hidden = false;

    element.tabPanel = mockPanel;
    element.selected = false;
    await elementIsStable(element);

    expect(mockPanel.hidden).toBe(true);
  });

  it('should show associated panel when selected', async () => {
    const mockPanel = document.createElement('bp-tab-panel') as BpTabPanel;
    mockPanel.hidden = true;

    element.tabPanel = mockPanel;
    element.selected = true;
    await elementIsStable(element);

    expect(mockPanel.hidden).toBe(false);
  });

  it('should support disabled state', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    expect(element.disabled).toBe(true);
    expect(element.getAttribute('disabled')).toBe(null);
  });

  it('should render slot content', async () => {
    fixture = await createFixture(html`
      <bp-tab>
        <span>tab</span>
        <strong>content</strong>
      </bp-tab>
    `);
    element = fixture.querySelector<BpTab>('bp-tab');
    await elementIsStable(element);

    expect(element.innerHTML).toContain('tab');
    expect(element.innerHTML).toContain('content');
  });
});
