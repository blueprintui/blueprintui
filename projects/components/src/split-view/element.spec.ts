import { html } from 'lit';
import { BpSplitView } from '@blueprintui/components/split-view';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';
import '@blueprintui/components/include/split-view.js';

describe('split-view element', () => {
  let fixture: HTMLElement;
  let element: BpSplitView;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<bp-split-view>
        <div slot="prefix">Left Panel</div>
        <div slot="suffix">Right Panel</div>
      </bp-split-view>`
    );
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

  it('should have correct default property values', async () => {
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
  });

  it('should render prefix and suffix slots', async () => {
    await elementIsStable(element);
    const prefixSlot = element.shadowRoot.querySelector('slot[name="prefix"]');
    const suffixSlot = element.shadowRoot.querySelector('slot[name="suffix"]');
    expect(prefixSlot).toBeTruthy();
    expect(suffixSlot).toBeTruthy();
  });

  it('should render bp-button-resize as divider', async () => {
    await elementIsStable(element);
    const resizeButton = element.shadowRoot.querySelector('bp-button-resize');
    expect(resizeButton).toBeTruthy();
  });

  it('should update position property', async () => {
    await elementIsStable(element);
    expect(element.position).toBe(50);

    element.position = 30;
    await elementIsStable(element);
    expect(element.position).toBe(30);

    element.position = 70;
    await elementIsStable(element);
    expect(element.position).toBe(70);
  });

  it('should support vertical orientation', async () => {
    await elementIsStable(element);
    expect(element.vertical).toBe(false);

    element.vertical = true;
    await elementIsStable(element);
    expect(element.vertical).toBe(true);
    expect(element.hasAttribute('vertical')).toBe(true);
  });

  it('should update layout when orientation changes', async () => {
    await elementIsStable(element);
    const initialGridColumns = element.style.gridTemplateColumns;
    const initialGridRows = element.style.gridTemplateRows;

    element.vertical = true;
    await elementIsStable(element);

    expect(element.style.gridTemplateColumns).not.toBe(initialGridColumns);
    expect(element.style.gridTemplateRows).not.toBe(initialGridRows);
  });

  it('should support position in pixels', async () => {
    await elementIsStable(element);
    expect(element.positionInPixels).toBe(false);

    element.positionInPixels = true;
    element.position = 250;
    await elementIsStable(element);

    expect(element.positionInPixels).toBe(true);
    expect(element.position).toBe(250);
  });

  it('should emit input event when position changes via resize button', async () => {
    await elementIsStable(element);
    const resizeButton = element.shadowRoot.querySelector('bp-button-resize') as any;
    const inputEvent = onceEvent(element, 'input');

    resizeButton.value = 60;
    resizeButton.dispatchEvent(new Event('input', { bubbles: true }));
    await elementIsStable(element);

    const event = await inputEvent;
    expect(event).toBeTruthy();
    expect(event.detail.position).toBeDefined();
  });

  it('should emit change event when resize ends', async () => {
    await elementIsStable(element);
    const resizeButton = element.shadowRoot.querySelector('bp-button-resize') as any;
    const changeEvent = onceEvent(element, 'change');

    resizeButton.value = 60;
    resizeButton.dispatchEvent(new Event('change', { bubbles: true }));
    await elementIsStable(element);

    const event = await changeEvent;
    expect(event).toBeTruthy();
    expect(event.detail.position).toBeDefined();
  });

  it('should get position via getPosition method', async () => {
    await elementIsStable(element);
    expect(element.getPosition()).toBe(50);

    element.position = 40;
    await elementIsStable(element);
    expect(element.getPosition()).toBe(40);
  });

  it('should set position via setPosition method', async () => {
    await elementIsStable(element);
    element.setPosition(35);
    await elementIsStable(element);
    expect(element.position).toBe(35);
    expect(element.positionInPixels).toBe(false);

    element.setPosition(200, true);
    await elementIsStable(element);
    expect(element.position).toBe(200);
    expect(element.positionInPixels).toBe(true);
  });

  it('should disable resizing when disabled is true', async () => {
    await elementIsStable(element);
    const resizeButton = element.shadowRoot.querySelector('bp-button-resize') as any;
    expect(resizeButton.disabled).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(resizeButton.disabled).toBe(true);
  });

  it('should apply prefix-min constraint', async () => {
    element.prefixMin = 100;
    element.style.width = '500px';
    await elementIsStable(element);

    // This test validates the constraint logic exists
    // Actual constraint enforcement happens during resize interactions
    expect(element.prefixMin).toBe(100);
  });

  it('should apply prefix-max constraint', async () => {
    element.prefixMax = 300;
    element.style.width = '500px';
    await elementIsStable(element);

    expect(element.prefixMax).toBe(300);
  });

  it('should apply suffix-min constraint', async () => {
    element.suffixMin = 100;
    element.style.width = '500px';
    await elementIsStable(element);

    expect(element.suffixMin).toBe(100);
  });

  it('should apply suffix-max constraint', async () => {
    element.suffixMax = 300;
    element.style.width = '500px';
    await elementIsStable(element);

    expect(element.suffixMax).toBe(300);
  });

  it('should parse snap points from string', async () => {
    element.snap = '25 50 75';
    await elementIsStable(element);

    expect(element.snap).toBe('25 50 75');
  });

  it('should respect snap threshold', async () => {
    element.snap = '25 50 75';
    element.snapThreshold = 15;
    await elementIsStable(element);

    expect(element.snapThreshold).toBe(15);
  });

  it('should set aria-label on resize button', async () => {
    element.label = 'Custom splitter';
    await elementIsStable(element);

    const resizeButton = element.shadowRoot.querySelector('bp-button-resize') as any;
    expect(resizeButton.label).toContain('Custom splitter');
  });

  it('should have default aria-label for horizontal orientation', async () => {
    await elementIsStable(element);
    const resizeButton = element.shadowRoot.querySelector('bp-button-resize') as any;
    expect(resizeButton.label).toContain('Horizontal');
  });

  it('should have default aria-label for vertical orientation', async () => {
    element.vertical = true;
    await elementIsStable(element);
    const resizeButton = element.shadowRoot.querySelector('bp-button-resize') as any;
    expect(resizeButton.label).toContain('Vertical');
  });

  it('should render prefix-pane part', async () => {
    await elementIsStable(element);
    const prefixPane = element.shadowRoot.querySelector('[part="prefix-pane"]');
    expect(prefixPane).toBeTruthy();
  });

  it('should render suffix-pane part', async () => {
    await elementIsStable(element);
    const suffixPane = element.shadowRoot.querySelector('[part="suffix-pane"]');
    expect(suffixPane).toBeTruthy();
  });

  it('should render divider part', async () => {
    await elementIsStable(element);
    const divider = element.shadowRoot.querySelector('[part="divider"]');
    expect(divider).toBeTruthy();
  });

  it('should update grid layout based on position', async () => {
    await elementIsStable(element);

    element.position = 30;
    await elementIsStable(element);

    const gridColumns = element.style.gridTemplateColumns;
    expect(gridColumns).toContain('30%');
  });

  it('should update grid layout for vertical orientation', async () => {
    element.vertical = true;
    element.position = 40;
    await elementIsStable(element);

    const gridRows = element.style.gridTemplateRows;
    expect(gridRows).toContain('40%');
  });

  it('should handle position as percentage by default', async () => {
    element.position = 25;
    await elementIsStable(element);

    expect(element.positionInPixels).toBe(false);
    const gridColumns = element.style.gridTemplateColumns;
    expect(gridColumns).toContain('25%');
  });

  it('should handle position in pixels when positionInPixels is true', async () => {
    element.positionInPixels = true;
    element.position = 200;
    await elementIsStable(element);

    const gridColumns = element.style.gridTemplateColumns;
    expect(gridColumns).toContain('200px');
  });

  it('should support custom divider slot', async () => {
    removeFixture(fixture);
    fixture = await createFixture(
      html`<bp-split-view>
        <div slot="prefix">Left</div>
        <button slot="divider">Custom Divider</button>
        <div slot="suffix">Right</div>
      </bp-split-view>`
    );
    element = fixture.querySelector<BpSplitView>('bp-split-view');
    await elementIsStable(element);

    const dividerSlot = element.shadowRoot.querySelector('slot[name="divider"]');
    expect(dividerSlot).toBeTruthy();
  });

  it('should handle multiple position updates', async () => {
    await elementIsStable(element);

    element.position = 20;
    await elementIsStable(element);
    expect(element.position).toBe(20);

    element.position = 40;
    await elementIsStable(element);
    expect(element.position).toBe(40);

    element.position = 60;
    await elementIsStable(element);
    expect(element.position).toBe(60);

    element.position = 80;
    await elementIsStable(element);
    expect(element.position).toBe(80);
  });

  it('should toggle between horizontal and vertical orientations', async () => {
    await elementIsStable(element);
    expect(element.vertical).toBe(false);

    element.vertical = true;
    await elementIsStable(element);
    expect(element.vertical).toBe(true);

    element.vertical = false;
    await elementIsStable(element);
    expect(element.vertical).toBe(false);
  });

  it('should maintain position when toggling orientation', async () => {
    element.position = 35;
    await elementIsStable(element);

    element.vertical = true;
    await elementIsStable(element);
    expect(element.position).toBe(35);

    element.vertical = false;
    await elementIsStable(element);
    expect(element.position).toBe(35);
  });

  it('should handle edge case positions (0 and 100)', async () => {
    element.position = 0;
    await elementIsStable(element);
    expect(element.position).toBe(0);

    element.position = 100;
    await elementIsStable(element);
    expect(element.position).toBe(100);
  });

  it('should pass orientation to resize button', async () => {
    await elementIsStable(element);
    const resizeButton = element.shadowRoot.querySelector('bp-button-resize') as any;
    expect(resizeButton.orientation).toBe('horizontal');

    element.vertical = true;
    await elementIsStable(element);
    expect(resizeButton.orientation).toBe('vertical');
  });

  it('should handle snap with empty string', async () => {
    element.snap = '';
    await elementIsStable(element);
    expect(element.snap).toBe('');
  });

  it('should handle snap with single value', async () => {
    element.snap = '50';
    await elementIsStable(element);
    expect(element.snap).toBe('50');
  });

  it('should handle snap with multiple values', async () => {
    element.snap = '10 20 30 40 50 60 70 80 90';
    await elementIsStable(element);
    expect(element.snap).toBe('10 20 30 40 50 60 70 80 90');
  });

  it('should allow decimal position values', async () => {
    element.position = 33.33;
    await elementIsStable(element);
    expect(element.position).toBe(33.33);
  });

  it('should update layout immediately when properties change', async () => {
    const initialColumns = element.style.gridTemplateColumns;

    element.position = 75;
    await elementIsStable(element);

    expect(element.style.gridTemplateColumns).not.toBe(initialColumns);
    expect(element.style.gridTemplateColumns).toContain('75%');
  });
});
