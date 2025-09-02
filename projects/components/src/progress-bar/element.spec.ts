import { html, LitElement } from 'lit';
import '@blueprintui/components/include/progress-bar.js';
import { BpProgressBar } from '@blueprintui/components/progress-bar';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('progress bar element – ', () => {
  let fixture: HTMLElement;
  let element: BpProgressBar;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-progress-bar></bp-progress-bar>`);
    element = fixture.querySelector<BpProgressBar>('bp-progress-bar');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should not have aria attrs if value is not set', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.ariaValueNow).toBe(null);
    expect((element as any)._internals.ariaValueMin).toBe('0');
    expect((element as any)._internals.ariaValueMax).toBe('1');
    expect((element as any)._internals.role).toBe('progressbar');
  });

  it('should set progressbar semantics if value set', async () => {
    element.value = 49;
    await elementIsStable(element);
    expect((element as any)._internals.ariaValueNow).toBe('49');
    expect((element as any)._internals.ariaValueMin).toBe('0');
    expect((element as any)._internals.ariaValueMax).toBe('100');
    expect((element as any)._internals.role).toBe('progressbar');
  });

  it('should show indeterminate label if no label is set and there is no value', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.ariaLabel).toBe('loading');
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-progress-bar')).toBe(BpProgressBar);
  });

  it('should handle default property values', async () => {
    await elementIsStable(element);
    expect(element.min).toBe(0);
    expect(element.max).toBe(100);
    expect(element.value).toBe(null);
    expect(element.status).toBe(undefined);
  });

  it('should handle min and max properties', async () => {
    element.min = 10;
    element.max = 50;
    await elementIsStable(element);

    expect(element.min).toBe(10);
    expect(element.max).toBe(50);

    const progress = element.shadowRoot.querySelector('progress');
    expect(progress.getAttribute('min')).toBe('10');
    expect(progress.getAttribute('max')).toBe('50');
  });

  it('should handle status property', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);

    const statuses = ['accent', 'success', 'warning', 'danger'] as const;
    for (const status of statuses) {
      element.status = status;
      await elementIsStable(element);
      expect(element.status).toBe(status);
    }
  });

  it('should render internal structure correctly', async () => {
    await elementIsStable(element);

    const internal = element.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();

    const progress = element.shadowRoot.querySelector('progress');
    expect(progress).toBeTruthy();
    expect(progress.getAttribute('aria-hidden')).toBe('true');
  });

  it('should handle value changes and update ARIA attributes', async () => {
    await elementIsStable(element);

    // Initially no value
    expect(element._internals.ariaValueNow).toBe(null);
    expect(element._internals.ariaLabel).toBe('loading');

    // Set a value
    element.value = 75;
    await elementIsStable(element);

    expect(element._internals.ariaValueNow).toBe('75');
    expect(element._internals.ariaValueMin).toBe('0');
    expect(element._internals.ariaValueMax).toBe('100');

    const progress = element.shadowRoot.querySelector('progress');
    expect(progress.value).toBe(75);
  });

  it('should handle custom min/max with value', async () => {
    element.min = 20;
    element.max = 80;
    element.value = 50;
    await elementIsStable(element);

    expect(element._internals.ariaValueNow).toBe('50');
    expect(element._internals.ariaValueMin).toBe('20');
    expect(element._internals.ariaValueMax).toBe('80');
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--color', 'blue');
    await elementIsStable(element);

    expect(element.style.getPropertyValue('--color')).toBe('blue');
  });

  it('should have default i18n values', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeTruthy();
    expect(typeof element.i18n).toBe('object');
    expect('loading' in element.i18n).toBe(true);
  });

  it('should handle indeterminate state (no value)', async () => {
    await elementIsStable(element);

    const progress = element.shadowRoot.querySelector('progress');
    expect(progress.hasAttribute('value')).toBe(false);
    expect(element._internals.ariaLabel).toBe('loading');
    expect(element._internals.ariaValueNow).toBe(null);
  });

  it('should handle zero value correctly', async () => {
    element.value = 0;
    await elementIsStable(element);

    expect(element._internals.ariaValueNow).toBe('0');
    const progress = element.shadowRoot.querySelector('progress');
    expect(progress.value).toBe(0);
  });

  it('should handle null and undefined values', async () => {
    // Test null value
    element.value = null;
    await elementIsStable(element);
    expect(element._internals.ariaValueNow).toBe(null);
    expect(element._internals.ariaLabel).toBe('loading');

    // Test undefined value
    element.value = undefined;
    await elementIsStable(element);
    expect(element._internals.ariaValueNow).toBe(null);
    expect(element._internals.ariaLabel).toBe('loading');
  });

  it('should extend LitElement and implement BpTypeElement', async () => {
    await elementIsStable(element);

    expect(typeof element.render).toBe('function');
    expect(typeof element.connectedCallback).toBe('function');
    expect(element instanceof LitElement).toBe(true);
  });

  it('should handle ElementInternals correctly', async () => {
    await elementIsStable(element);

    expect(element._internals).toBeTruthy();
    expect(typeof element._internals).toBe('object');
    expect(element._internals.role).toBe('progressbar');
  });

  it('should support i18n decorator', async () => {
    await elementIsStable(element);

    expect(element.i18n).toBeTruthy();
    expect(typeof element.i18n.loading).toBe('string');
  });

  it('should handle ARIA attributes for different value states', async () => {
    await elementIsStable(element);

    // Test indeterminate state
    expect(element._internals.ariaValueMin).toBe('0');
    expect(element._internals.ariaValueMax).toBe('1');
    expect(element._internals.ariaValueNow).toBe(null);
    expect(element._internals.ariaLabel).toBe('loading');

    // Test with value
    element.value = 60;
    await elementIsStable(element);

    expect(element._internals.ariaValueMin).toBe('0');
    expect(element._internals.ariaValueMax).toBe('100');
    expect(element._internals.ariaValueNow).toBe('60');
  });

  it('should maintain proper accessibility semantics', async () => {
    await elementIsStable(element);

    // Progress element should be hidden from screen readers
    const progress = element.shadowRoot.querySelector('progress');
    expect(progress.getAttribute('aria-hidden')).toBe('true');

    // Host element should have progressbar role
    expect(element._internals.role).toBe('progressbar');
  });
});
