import { html } from 'lit';
import '@blueprintui/components/include/format-number.js';
import { BpFormatNumber } from '@blueprintui/components/format-number';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-format-number', () => {
  let fixture: HTMLElement;
  let element: BpFormatNumber;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-format-number></bp-format-number>`);
    element = fixture.querySelector<BpFormatNumber>('bp-format-number');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-format-number')).toBe(BpFormatNumber);
  });

  it('should use a data tag format with a value', async () => {
    element.value = 1234567;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('data').value).toBe('1234567');
  });

  it('should format a given number', async () => {
    element.value = 1234567;
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {}).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format a given number with a custom format', async () => {
    element.value = 1234567;
    element.format = 'percent';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', { style: 'percent' }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format a given currency', async () => {
    element.value = 1234567;
    element.currency = 'USD';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });
});
