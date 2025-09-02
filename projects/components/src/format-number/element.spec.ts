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

  it('should format with different locales', async () => {
    element.value = 1234567;
    element.locales = ['de-DE'];
    await elementIsStable(element);

    const format = new Intl.NumberFormat('de-DE', {}).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with currency sign accounting', async () => {
    element.value = -1234567;
    element.currency = 'USD';
    element.currencySign = 'accounting';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencySign: 'accounting'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with currency display code', async () => {
    element.value = 1234567;
    element.currency = 'USD';
    element.currencyDisplay = 'code';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'code'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with currency display name', async () => {
    element.value = 1234567;
    element.currency = 'USD';
    element.currencyDisplay = 'name';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'name'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with compact display short', async () => {
    element.value = 1234567;
    element.notation = 'compact';
    element.compactDisplay = 'short';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with compact display long', async () => {
    element.value = 1234567;
    element.notation = 'compact';
    element.compactDisplay = 'long';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'long'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with unit display long', async () => {
    element.value = 1234567;
    element.unitDisplay = 'long';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      unitDisplay: 'long'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with unit display short', async () => {
    element.value = 1234567;
    element.unitDisplay = 'short';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      unitDisplay: 'short'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with unit display narrow', async () => {
    element.value = 1234567;
    element.unitDisplay = 'narrow';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      unitDisplay: 'narrow'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with scientific notation', async () => {
    element.value = 1234567;
    element.notation = 'scientific';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      notation: 'scientific'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with engineering notation', async () => {
    element.value = 1234567;
    element.notation = 'engineering';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      notation: 'engineering'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with sign display always', async () => {
    element.value = 1234567;
    element.signDisplay = 'always';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      signDisplay: 'always'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with sign display never', async () => {
    element.value = 1234567;
    element.signDisplay = 'never';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      signDisplay: 'never'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with sign display exceptZero', async () => {
    element.value = 1234567;
    element.signDisplay = 'exceptZero';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      signDisplay: 'exceptZero'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format negative numbers correctly', async () => {
    element.value = -1234567;
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {}).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format zero correctly', async () => {
    element.value = 0;
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {}).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format decimal numbers correctly', async () => {
    element.value = 1234.567;
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {}).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with different currency types', async () => {
    element.value = 1234567;
    element.currency = 'EUR';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should format with JPY currency', async () => {
    element.value = 1234567;
    element.currency = 'JPY';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'JPY'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should handle text content parsing in connectedCallback', async () => {
    fixture = await createFixture(html`<bp-format-number>1234.56</bp-format-number>`);
    element = fixture.querySelector<BpFormatNumber>('bp-format-number');
    await elementIsStable(element);

    expect(element.value).toBe(1234.56);
  });

  it('should handle bp-textchange event', async () => {
    element.textContent = '9876.54';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    expect(element.value).toBe(9876.54);
  });

  it('should handle invalid text content gracefully', async () => {
    element.textContent = 'invalid-number';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    expect(element.value).toBeNaN();
  });

  it('should handle empty text content', async () => {
    element.textContent = '';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    expect(element.value).toBeNaN();
  });

  it('should combine multiple formatting options', async () => {
    element.value = 1234567;
    element.locales = ['de-DE'];
    element.currency = 'EUR';
    element.currencyDisplay = 'code';
    element.currencySign = 'standard';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'standard'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should handle very large numbers with compact notation', async () => {
    element.value = 1000000000000;
    element.notation = 'compact';
    element.compactDisplay = 'short';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should handle very small decimal numbers', async () => {
    element.value = 0.000123;
    element.notation = 'scientific';
    await elementIsStable(element);

    const format = new Intl.NumberFormat('en-US', {
      notation: 'scientific'
    }).format(element.value);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });
});
