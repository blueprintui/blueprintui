import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpRange } from '@blueprintui/components/range';
import '@blueprintui/components/include/range.js';

describe('bp-range', () => {
  let element: BpRange;
  let internalRange: HTMLInputElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>range</label>
        <bp-range></bp-range>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpRange>('bp-range');
    internalRange = element.shadowRoot.querySelector('input');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-range')).toBe(BpRange);
  });

  it('should set the internal range aria-label from user provided label', async () => {
    await elementIsStable(element);
    expect(internalRange.ariaLabel).toBe('range');
  });

  it('should set the internal range value', async () => {
    await elementIsStable(element);
    expect(internalRange.value).toBe('50');

    element.value = 100;
    await elementIsStable(element);
    expect(internalRange.value).toBe('100');
  });

  it('should set the internal range min', async () => {
    await elementIsStable(element);
    expect(internalRange.min).toBe('0');

    element.min = 10;
    await elementIsStable(element);
    expect(internalRange.min).toBe('10');
  });

  it('should set the internal range max', async () => {
    await elementIsStable(element);
    expect(internalRange.max).toBe('100');

    element.max = 75;
    await elementIsStable(element);
    expect(internalRange.max).toBe('75');
  });

  it('should set the internal range step', async () => {
    await elementIsStable(element);
    expect(internalRange.step).toBe('1');

    element.step = 5;
    await elementIsStable(element);
    expect(internalRange.step).toBe('5');
  });

  it('should set the internal range disabled', async () => {
    await elementIsStable(element);
    expect(internalRange.disabled).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(internalRange.disabled).toBe(true);
  });
});
