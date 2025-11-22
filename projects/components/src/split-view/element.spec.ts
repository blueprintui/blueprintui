import { html } from 'lit';
import { BpSplitView } from '@blueprintui/components/split-view';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';
import '@blueprintui/components/include/split-view.js';

describe('split-view element', () => {
  let fixture: HTMLElement;
  let element: BpSplitView;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-split-view>
        <div slot="prefix">Left Panel</div>
        <div slot="suffix">Right Panel</div>
      </bp-split-view>
    `);
    element = fixture.querySelector<BpSplitView>('bp-split-view');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-split-view')).toBe(BpSplitView);
  });

  it('should have default property values', async () => {
    await elementIsStable(element);
    expect(element.vertical).toBe(false);
    expect(element.position).toBe(50);
    expect(element.positionInPixels).toBe(false);
    expect(element.prefixMin).toBe(0);
    expect(element.prefixMax).toBe(undefined);
    expect(element.suffixMin).toBe(0);
    expect(element.suffixMax).toBe(undefined);
    expect(element.disabled).toBe(false);
    expect(element.snap).toBe(undefined);
    expect(element.snapThreshold).toBe(12);
    expect(element.label).toBe('Resize panels');
  });

  it('should render prefix and suffix slots', async () => {
    await elementIsStable(element);
    const prefixSlot = element.shadowRoot?.querySelector('slot[name="prefix"]');
    const suffixSlot = element.shadowRoot?.querySelector('slot[name="suffix"]');
    expect(prefixSlot).toBeTruthy();
    expect(suffixSlot).toBeTruthy();
  });

  it('should render bp-button-resize divider', async () => {
    await elementIsStable(element);
    const divider = element.shadowRoot?.querySelector('bp-button-resize');
    expect(divider).toBeTruthy();
    expect(divider?.orientation).toBe('horizontal');
  });

  it('should support vertical orientation', async () => {
    element.vertical = true;
    await elementIsStable(element);
    const divider = element.shadowRoot?.querySelector('bp-button-resize');
    expect(divider?.orientation).toBe('vertical');
    expect(element.hasAttribute('vertical')).toBe(true);
  });

  it('should support horizontal orientation (default)', async () => {
    await elementIsStable(element);
    const divider = element.shadowRoot?.querySelector('bp-button-resize');
    expect(divider?.orientation).toBe('horizontal');
    expect(element.hasAttribute('vertical')).toBe(false);
  });

  it('should set position as percentage by default', async () => {
    element.position = 30;
    await elementIsStable(element);
    expect(element.position).toBe(30);
    expect(element.positionInPixels).toBe(false);
  });

  it('should support position in pixels', async () => {
    element.positionInPixels = true;
    element.position = 200;
    await elementIsStable(element);
    expect(element.position).toBe(200);
    expect(element.positionInPixels).toBe(true);
  });

  it('should update position via setPosition method', async () => {
    element.setPosition(75);
    await elementIsStable(element);
    expect(element.position).toBe(75);
    expect(element.positionInPixels).toBe(false);
  });

  it('should update position in pixels via setPosition method', async () => {
    element.setPosition(300, true);
    await elementIsStable(element);
    expect(element.position).toBe(300);
    expect(element.positionInPixels).toBe(true);
  });

  it('should get position via getPosition method', async () => {
    element.position = 60;
    await elementIsStable(element);
    expect(element.getPosition()).toBe(60);
  });

  it('should emit input event during resize', async () => {
    const inputEvent = onceEvent(element, 'input');
    const divider = element.shadowRoot?.querySelector('bp-button-resize');
    divider?.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await elementIsStable(element);
    const event = await inputEvent;
    expect(event).toBeTruthy();
  });

  it('should emit change event on resize end', async () => {
    const changeEvent = onceEvent(element, 'change');
    const divider = element.shadowRoot?.querySelector('bp-button-resize');
    divider?.dispatchEvent(new InputEvent('change', { bubbles: true }));
    await elementIsStable(element);
    const event = await changeEvent;
    expect(event).toBeTruthy();
  });

  it('should support disabled state', async () => {
    element.disabled = true;
    await elementIsStable(element);
    const divider = element.shadowRoot?.querySelector('bp-button-resize');
    expect(element.disabled).toBe(true);
    expect(divider?.disabled).toBe(true);
    expect(element.hasAttribute('disabled')).toBe(true);
  });

  it('should support prefix-min constraint', async () => {
    element.prefixMin = 100;
    await elementIsStable(element);
    expect(element.prefixMin).toBe(100);
    expect(element.hasAttribute('prefix-min')).toBe(true);
  });

  it('should support prefix-max constraint', async () => {
    element.prefixMax = 500;
    await elementIsStable(element);
    expect(element.prefixMax).toBe(500);
    expect(element.hasAttribute('prefix-max')).toBe(true);
  });

  it('should support suffix-min constraint', async () => {
    element.suffixMin = 150;
    await elementIsStable(element);
    expect(element.suffixMin).toBe(150);
    expect(element.hasAttribute('suffix-min')).toBe(true);
  });

  it('should support suffix-max constraint', async () => {
    element.suffixMax = 600;
    await elementIsStable(element);
    expect(element.suffixMax).toBe(600);
    expect(element.hasAttribute('suffix-max')).toBe(true);
  });

  it('should support snap points', async () => {
    element.snap = '25 50 75';
    await elementIsStable(element);
    expect(element.snap).toBe('25 50 75');
  });

  it('should support snap threshold', async () => {
    element.snapThreshold = 20;
    await elementIsStable(element);
    expect(element.snapThreshold).toBe(20);
  });

  it('should support custom aria-label', async () => {
    element.label = 'Resize code editor';
    await elementIsStable(element);
    const divider = element.shadowRoot?.querySelector('bp-button-resize');
    expect(divider?.getAttribute('aria-label')).toBe('Resize code editor');
  });

  it('should expose CSS parts', async () => {
    await elementIsStable(element);
    const divider = element.shadowRoot?.querySelector('[part="divider"]');
    const prefixPane = element.shadowRoot?.querySelector('[part="prefix-pane"]');
    const suffixPane = element.shadowRoot?.querySelector('[part="suffix-pane"]');
    expect(divider).toBeTruthy();
    expect(prefixPane).toBeTruthy();
    expect(suffixPane).toBeTruthy();
  });

  it('should apply correct CSS classes to panes', async () => {
    await elementIsStable(element);
    const prefixPane = element.shadowRoot?.querySelector('.pane.prefix');
    const suffixPane = element.shadowRoot?.querySelector('.pane.suffix');
    expect(prefixPane).toBeTruthy();
    expect(suffixPane).toBeTruthy();
  });

  it('should update divider value when position changes', async () => {
    element.position = 70;
    await elementIsStable(element);
    const divider = element.shadowRoot?.querySelector('bp-button-resize');
    expect(divider?.value).toBe(70);
  });

  it('should handle position changes reactively', async () => {
    element.position = 25;
    await elementIsStable(element);
    expect(element.position).toBe(25);

    element.position = 75;
    await elementIsStable(element);
    expect(element.position).toBe(75);
  });

  it('should handle vertical orientation attribute', async () => {
    element.setAttribute('vertical', '');
    await elementIsStable(element);
    expect(element.vertical).toBe(true);
  });

  it('should handle position-in-pixels attribute', async () => {
    element.setAttribute('position-in-pixels', '');
    await elementIsStable(element);
    expect(element.positionInPixels).toBe(true);
  });

  it('should render with correct grid layout for horizontal', async () => {
    await elementIsStable(element);
    const style = getComputedStyle(element);
    expect(style.display).toBe('grid');
  });

  it('should render with correct grid layout for vertical', async () => {
    element.vertical = true;
    await elementIsStable(element);
    const style = getComputedStyle(element);
    expect(style.display).toBe('grid');
  });
});
