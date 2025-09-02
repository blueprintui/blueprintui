import { html } from 'lit';
import '@blueprintui/components/include/progress-circle.js';
import { BpProgressCircle } from '@blueprintui/components/progress-circle';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('progress circle element – ', () => {
  let fixture: HTMLElement;
  let element: BpProgressCircle;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-progress-circle></bp-progress-circle>`);
    element = fixture.querySelector<BpProgressCircle>('bp-progress-circle');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.line).toBe(3);
    expect(element.value).toBeUndefined();
    expect(element.status).toBeUndefined();
    expect(element.size).toBeUndefined();
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

  it('should have class backstroke if value is not set', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('circle.backstroke')).not.toBe(null);
    expect(element.shadowRoot.querySelector('circle.arcstroke')).toBe(null);
  });

  it('should have classname backstroke if value set but less than 100', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('circle.backstroke')).not.toBe(null);
    expect(element.shadowRoot.querySelector('circle.arcstroke')).toBe(null);
  });

  it('should have classname of arcstroke if value is greater than 99', async () => {
    element.value = 100;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('circle.backstroke')).toBe(null);
    expect(element.shadowRoot.querySelector('circle.arcstroke')).not.toBe(null);
  });

  it('should support status property', async () => {
    await elementIsStable(element);

    element.status = 'success';
    await elementIsStable(element);
    expect(element.status).toBe('success');
    expect(element.getAttribute('status')).toBe('success');

    element.status = 'warning';
    await elementIsStable(element);
    expect(element.status).toBe('warning');
    expect(element.getAttribute('status')).toBe('warning');
  });

  it('should support line property', async () => {
    await elementIsStable(element);
    expect(element.line).toBe(3);

    element.line = 5;
    await elementIsStable(element);
    expect(element.line).toBe(5);
  });

  it('should support size property', async () => {
    await elementIsStable(element);
    expect(element.size).toBeUndefined();

    element.size = 'lg';
    await elementIsStable(element);
    expect(element.size).toBe('lg');
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should render SVG with correct attributes', async () => {
    await elementIsStable(element);
    const svg = element.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('viewBox')).toBe('0 0 36 36');
    expect(svg.getAttribute('focusable')).toBe('false');
  });

  it('should render circle with correct attributes', async () => {
    await elementIsStable(element);
    const circle = element.shadowRoot.querySelector('circle');
    expect(circle).toBeTruthy();
    expect(circle.getAttribute('stroke-width')).toBe('3');
    expect(circle.getAttribute('fill')).toBe('none');
    expect(circle.getAttribute('cx')).toBe('18');
    expect(circle.getAttribute('cy')).toBe('18');
  });

  it('should render path with correct attributes', async () => {
    await elementIsStable(element);
    const path = element.shadowRoot.querySelector('path');
    expect(path).toBeTruthy();
    expect(path.getAttribute('stroke-width')).toBe('3');
    expect(path.getAttribute('class')).toBe('fillstroke arcstroke');
    expect(path.getAttribute('fill')).toBe('none');
  });

  it('should handle edge case values', async () => {
    await elementIsStable(element);

    // Test value of 0
    element.value = 0;
    await elementIsStable(element);
    expect((element as any)._internals.ariaValueNow).toBe('0');
    expect((element as any)._internals.ariaValueMax).toBe('100');

    // Test value of 99 (should still show backstroke)
    element.value = 99;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('circle.backstroke')).not.toBe(null);
    expect(element.shadowRoot.querySelector('circle.arcstroke')).toBe(null);

    // Test value of 100 (should show arcstroke)
    element.value = 100;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('circle.backstroke')).toBe(null);
    expect(element.shadowRoot.querySelector('circle.arcstroke')).not.toBe(null);
  });

  it('should handle null and undefined values', async () => {
    await elementIsStable(element);

    // Test null value
    element.value = null;
    await elementIsStable(element);
    expect((element as any)._internals.ariaValueNow).toBe(null);
    expect((element as any)._internals.ariaValueMax).toBe('1');
    expect((element as any)._internals.ariaLabel).toBe('loading');

    // Test undefined value
    element.value = undefined;
    await elementIsStable(element);
    expect((element as any)._internals.ariaValueNow).toBe(null);
    expect((element as any)._internals.ariaValueMax).toBe('1');
    expect((element as any)._internals.ariaLabel).toBe('loading');
  });

  it('should update aria attributes when value changes', async () => {
    await elementIsStable(element);

    // Initial state
    expect((element as any)._internals.ariaValueNow).toBe(null);
    expect((element as any)._internals.ariaValueMax).toBe('1');

    // Change to determinate state
    element.value = 50;
    await elementIsStable(element);
    expect((element as any)._internals.ariaValueNow).toBe('50');
    expect((element as any)._internals.ariaValueMax).toBe('100');

    // Change back to indeterminate state
    element.value = null;
    await elementIsStable(element);
    expect((element as any)._internals.ariaValueNow).toBe(null);
    expect((element as any)._internals.ariaValueMax).toBe('1');
  });

  // it('updates loading i18n strings as expected', async () => {
  //   component.value = 75;
  //   await elementIsStable(component);
  //   component.i18n = { loading: '${value}' } as any;
  //   await elementIsStable(component);
  //   expect((component as any)._internals.ariaLabel).toBe('loading 75');
  // });
});
