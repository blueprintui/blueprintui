import { html, LitElement } from 'lit';
import { BpDivider } from '@blueprintui/components/divider';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '@blueprintui/components/include/divider.js';

describe('bp-divider', () => {
  let fixture: HTMLElement;
  let element: BpDivider;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-divider></bp-divider>`);
    element = fixture.querySelector<BpDivider>('bp-divider');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element).not.toBe(null);
  });

  it('should default aria role to separator', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('separator');
  });

  it('should default aria orientation to horizontal', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.ariaOrientation).toBe('horizontal');
  });

  it('should update aria orientation when orientation is set', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.ariaOrientation).toBe('horizontal');

    element.orientation = 'vertical';
    await elementIsStable(element);
    expect((element as any)._internals.ariaOrientation).toBe('vertical');
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-divider')).toBe(BpDivider);
  });

  it('should handle orientation property correctly', async () => {
    await elementIsStable(element);
    expect(element.orientation).toBe('horizontal');

    element.orientation = 'vertical';
    await elementIsStable(element);
    expect(element.orientation).toBe('vertical');
    expect(element._internals.ariaOrientation).toBe('vertical');

    element.orientation = 'horizontal';
    await elementIsStable(element);
    expect(element.orientation).toBe('horizontal');
    expect(element._internals.ariaOrientation).toBe('horizontal');
  });

  it('should render internal structure correctly', async () => {
    await elementIsStable(element);

    const internal = element.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
    expect(internal.tagName).toBe('DIV');
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--background', 'gray');
    element.style.setProperty('--size', '2px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('gray');
    expect(element.style.getPropertyValue('--size')).toBe('2px');
  });

  it('should handle ElementInternals correctly', async () => {
    await elementIsStable(element);

    // ElementInternals should be attached in constructor
    expect(element._internals).toBeTruthy();
    expect(typeof element._internals).toBe('object');
    expect(element._internals.role).toBe('separator');
  });

  it('should extend LitElement and implement BpTypeElement', async () => {
    await elementIsStable(element);

    // Should have LitElement properties
    expect(typeof element.render).toBe('function');
    expect(typeof element.constructor).toBe('function');

    // Should implement BpTypeElement interface
    expect(element instanceof LitElement).toBe(true);
    expect('orientation' in element).toBe(true);
  });

  it('should initialize internals in constructor', async () => {
    await elementIsStable(element);

    // Constructor should set up internals with default values
    expect(element._internals.role).toBe('separator');
    expect(element._internals.ariaOrientation).toBe('horizontal');
  });

  it('should handle vertical orientation', async () => {
    const verticalFixture = await createFixture(html`<bp-divider orientation="vertical"></bp-divider>`);
    const verticalElement = verticalFixture.querySelector<BpDivider>('bp-divider');
    await elementIsStable(verticalElement);

    expect(verticalElement.orientation).toBe('vertical');
    expect(verticalElement._internals.ariaOrientation).toBe('vertical');

    removeFixture(verticalFixture);
  });

  it('should handle horizontal orientation (default)', async () => {
    const horizontalFixture = await createFixture(html`<bp-divider orientation="horizontal"></bp-divider>`);
    const horizontalElement = horizontalFixture.querySelector<BpDivider>('bp-divider');
    await elementIsStable(horizontalElement);

    expect(horizontalElement.orientation).toBe('horizontal');
    expect(horizontalElement._internals.ariaOrientation).toBe('horizontal');

    removeFixture(horizontalFixture);
  });

  it('should update aria orientation on property change', async () => {
    await elementIsStable(element);

    // Start with horizontal
    expect(element._internals.ariaOrientation).toBe('horizontal');

    // Change to vertical
    element.orientation = 'vertical';
    await elementIsStable(element);
    expect(element._internals.ariaOrientation).toBe('vertical');

    // Change back to horizontal
    element.orientation = 'horizontal';
    await elementIsStable(element);
    expect(element._internals.ariaOrientation).toBe('horizontal');
  });

  it('should handle accessibility attributes correctly', async () => {
    await elementIsStable(element);

    // Should have proper ARIA attributes for screen readers
    expect(element._internals.role).toBe('separator');
    expect(element._internals.ariaOrientation).toBe('horizontal');

    // Verify these are maintained when orientation changes
    element.orientation = 'vertical';
    await elementIsStable(element);
    expect(element._internals.role).toBe('separator'); // Should not change
    expect(element._internals.ariaOrientation).toBe('vertical'); // Should update
  });

  it('should render minimal shadow DOM', async () => {
    await elementIsStable(element);

    const shadowElements = element.shadowRoot.querySelectorAll('*');
    expect(shadowElements.length).toBe(1); // Just the internal div
    expect(shadowElements[0].tagName).toBe('DIV');
    expect(shadowElements[0].getAttribute('part')).toBe('internal');
  });

  it('should have no text content or slots', async () => {
    await elementIsStable(element);

    // Divider should not have slots or content, it's purely visual
    const slots = element.shadowRoot.querySelectorAll('slot');
    expect(slots.length).toBe(0);

    expect(element.textContent.trim()).toBe('');
  });

  it('should support both orientation values only', async () => {
    await elementIsStable(element);

    // Test that TypeScript typing restricts to valid values
    // In runtime, we verify the expected values work
    const validOrientations = ['horizontal', 'vertical'] as const;

    for (const orientation of validOrientations) {
      element.orientation = orientation;
      await elementIsStable(element);
      expect(element.orientation).toBe(orientation);
      expect(element._internals.ariaOrientation).toBe(orientation);
    }
  });
});
