import { html } from 'lit';
import '@blueprintui/components/include/format-bytes.js';
import { BpFormatBytes } from '@blueprintui/components/format-bytes';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-format-bytes', () => {
  let fixture: HTMLElement;
  let element: BpFormatBytes;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-format-bytes></bp-format-bytes>`);
    element = fixture.querySelector<BpFormatBytes>('bp-format-bytes');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-format-bytes')).toBe(BpFormatBytes);
  });

  it('should use a data tag format with a value', async () => {
    element.value = 1024;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('data').value).toBe('1024');
  });

  it('should format bytes with decimal (1000) by default', async () => {
    element.value = 1000;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1 kb');
  });

  it('should format bytes with binary (1024)', async () => {
    element.value = 1024;
    element.display = 'binary';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1 kib');
  });

  it('should format zero bytes', async () => {
    element.value = 0;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('0 b');
  });

  it('should format bytes (less than 1000)', async () => {
    element.value = 500;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('500 b');
  });

  it('should format kilobytes', async () => {
    element.value = 1500;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.5 kb');
  });

  it('should format megabytes', async () => {
    element.value = 1500000;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.5 mb');
  });

  it('should format gigabytes', async () => {
    element.value = 1500000000;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.5 gb');
  });

  it('should format terabytes', async () => {
    element.value = 1500000000000;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.5 tb');
  });

  it('should format petabytes', async () => {
    element.value = 1500000000000000;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.5 pb');
  });

  it('should format with binary units (KiB)', async () => {
    element.value = 2048;
    element.display = 'binary';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('2 kib');
  });

  it('should format with binary units (MiB)', async () => {
    element.value = 2097152; // 2 * 1024 * 1024
    element.display = 'binary';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('2 mib');
  });

  it('should format with binary units (GiB)', async () => {
    element.value = 2147483648; // 2 * 1024 * 1024 * 1024
    element.display = 'binary';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('2 gib');
  });

  it('should format with binary units (TiB)', async () => {
    element.value = 2199023255552; // 2 * 1024 * 1024 * 1024 * 1024
    element.display = 'binary';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('2 tib');
  });

  it('should format with binary units (PiB)', async () => {
    element.value = 2251799813685248; // 2 * 1024^5
    element.display = 'binary';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('2 pib');
  });

  it('should format with specific unit (KB)', async () => {
    element.value = 500;
    element.unit = 'kb';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('0.5 kb');
  });

  it('should format with specific unit (MB)', async () => {
    element.value = 1500000;
    element.unit = 'mb';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.5 mb');
  });

  it('should format with specific unit (GB)', async () => {
    element.value = 500000000;
    element.unit = 'gb';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('0.5 gb');
  });

  it('should format with long unit display', async () => {
    element.value = 1500000;
    element.unitDisplay = 'long';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.5 megabytes');
  });

  it('should respect minimumFractionDigits', async () => {
    element.value = 1500;
    element.minimumFractionDigits = 3;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.500 kb');
  });

  it('should respect maximumFractionDigits', async () => {
    element.value = 1234;
    element.maximumFractionDigits = 0;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1 kb');
  });

  it('should format with different locales', async () => {
    element.value = 1500000;
    element.locales = ['de-DE'];
    await elementIsStable(element);
    // German locale uses comma as decimal separator
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toContain('1,5');
  });

  it('should handle negative values', async () => {
    element.value = -1500000;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('-1.5 mb');
  });

  it('should handle text content parsing in connectedCallback', async () => {
    fixture = await createFixture(html`<bp-format-bytes>1024</bp-format-bytes>`);
    element = fixture.querySelector<BpFormatBytes>('bp-format-bytes');
    await elementIsStable(element);

    expect(element.value).toBe(1024);
  });

  it('should handle bp-textchange event', async () => {
    element.textContent = '2048';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    expect(element.value).toBe(2048);
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

  it('should combine specific unit with binary display', async () => {
    element.value = 512;
    element.unit = 'kb';
    element.display = 'binary';
    await elementIsStable(element);
    // 512 bytes / 1024 = 0.5 KB (using binary divisor)
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('0.5 kib');
  });

  it('should handle very large numbers', async () => {
    element.value = 9999999999999999;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toContain('pb');
  });

  it('should handle decimal byte values', async () => {
    element.value = 1500.5;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.5 kb');
  });

  it('should format with long display and multiple KB', async () => {
    element.value = 3000;
    element.unitDisplay = 'long';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('3 kilobytes');
  });

  it('should format with long display for bytes', async () => {
    element.value = 100;
    element.unitDisplay = 'long';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('100 bytes');
  });

  it('should handle forced unit that is larger than natural unit', async () => {
    element.value = 100;
    element.unit = 'gb';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('0 gb');
  });

  it('should handle forced unit that is smaller than natural unit', async () => {
    element.value = 1000000000;
    element.unit = 'kb';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1,000,000 kb');
  });

  it('should format 1024 bytes with default decimal display', async () => {
    element.value = 1024;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe('1.02 kb');
  });
});
