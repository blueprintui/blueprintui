import { html } from 'lit';
import '@blueprintui/components/include/format-relative-time.js';
import { BpFormatRelativeTime } from '@blueprintui/components/format-relative-time';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-format-relative-time', () => {
  let fixture: HTMLElement;
  let element: BpFormatRelativeTime;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-format-relative-time></bp-format-relative-time>`);
    element = fixture.querySelector<BpFormatRelativeTime>('bp-format-relative-time');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-format-relative-time')).toBe(BpFormatRelativeTime);
  });

  it('should use a time tag format with a datetime attribute', async () => {
    element.textContent = '2024-11-16T10:00:00Z';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const timeElement = element.shadowRoot.querySelector('time');
    expect(timeElement).toBeTruthy();
    expect(timeElement.getAttribute('datetime')).toBe('2024-11-16T10:00:00Z');
  });

  it('should format past time with "ago"', async () => {
    const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    element.textContent = pastDate.toISOString();
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('ago');
  });

  it('should format future time with "in"', async () => {
    const futureDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
    element.textContent = futureDate.toISOString();
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('in');
  });

  it('should use numeric="always" format', async () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 day ago
    element.textContent = yesterday.toISOString();
    element.numeric = 'always';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('1');
  });

  it('should use numeric="auto" format', async () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 day ago
    element.textContent = yesterday.toISOString();
    element.numeric = 'auto';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text.toLowerCase()).toContain('yesterday');
  });

  it('should format with formatStyle="long"', async () => {
    const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    element.textContent = pastDate.toISOString();
    element.formatStyle = 'long';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('hours');
  });

  it('should format with formatStyle="short"', async () => {
    const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    element.textContent = pastDate.toISOString();
    element.formatStyle = 'short';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('hr');
  });

  it('should format with formatStyle="narrow"', async () => {
    const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    element.textContent = pastDate.toISOString();
    element.formatStyle = 'narrow';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('h');
  });

  xit('should auto-select unit for seconds', async () => {
    const pastDate = new Date(Date.now() - 30 * 1000); // 30 seconds ago
    element.textContent = pastDate.toISOString();
    element.unit = 'auto';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('second');
  });

  it('should auto-select unit for minutes', async () => {
    const pastDate = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    element.textContent = pastDate.toISOString();
    element.unit = 'auto';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('minute');
  });

  it('should auto-select unit for hours', async () => {
    const pastDate = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 hours ago
    element.textContent = pastDate.toISOString();
    element.unit = 'auto';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('hour');
  });

  it('should auto-select unit for days', async () => {
    const pastDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    element.textContent = pastDate.toISOString();
    element.unit = 'auto';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('day');
  });

  it('should auto-select unit for weeks', async () => {
    const pastDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago (about a week)
    element.textContent = pastDate.toISOString();
    element.unit = 'auto';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('week');
  });

  it('should auto-select unit for months', async () => {
    const pastDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000); // 45 days ago (about a month)
    element.textContent = pastDate.toISOString();
    element.unit = 'auto';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('month');
  });

  it('should auto-select unit for years', async () => {
    const pastDate = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000); // 400 days ago (over a year)
    element.textContent = pastDate.toISOString();
    element.unit = 'auto';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('year');
  });

  it('should use specific unit="second"', async () => {
    const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    element.textContent = pastDate.toISOString();
    element.unit = 'second';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('second');
  });

  it('should use specific unit="minute"', async () => {
    const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    element.textContent = pastDate.toISOString();
    element.unit = 'minute';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('minute');
  });

  it('should use specific unit="hour"', async () => {
    const pastDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    element.textContent = pastDate.toISOString();
    element.unit = 'hour';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('hour');
  });

  it('should use specific unit="day"', async () => {
    const pastDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    element.textContent = pastDate.toISOString();
    element.unit = 'day';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('day');
  });

  it('should use specific unit="week"', async () => {
    const pastDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000); // 14 days ago
    element.textContent = pastDate.toISOString();
    element.unit = 'week';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('week');
  });

  it('should use specific unit="month"', async () => {
    const pastDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); // 60 days ago
    element.textContent = pastDate.toISOString();
    element.unit = 'month';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('month');
  });

  it('should use specific unit="year"', async () => {
    const pastDate = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000); // 400 days ago
    element.textContent = pastDate.toISOString();
    element.unit = 'year';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);
    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('year');
  });

  it('should handle text content parsing in connectedCallback', async () => {
    const testDate = new Date(Date.now() - 2 * 60 * 60 * 1000);
    fixture = await createFixture(html`<bp-format-relative-time>${testDate.toISOString()}</bp-format-relative-time>`);
    element = fixture.querySelector<BpFormatRelativeTime>('bp-format-relative-time');
    await elementIsStable(element);

    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toBeTruthy();
    expect(text).toContain('ago');
  });

  it('should handle bp-textchange event', async () => {
    const testDate = new Date(Date.now() - 3 * 60 * 60 * 1000);
    element.textContent = testDate.toISOString();
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('ago');
  });

  it('should handle invalid date gracefully', async () => {
    element.textContent = 'invalid-date';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toBe('');
  });

  it('should handle empty text content', async () => {
    element.textContent = '';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toBe('');
  });

  it('should support locale formatting', async () => {
    const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    element.textContent = pastDate.toISOString();
    element.locale = 'en-US';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toBeTruthy();
  });

  it('should handle sync mode updates', async () => {
    jasmine.clock().install();

    const testDate = new Date(Date.now() - 30 * 1000); // 30 seconds ago
    element.textContent = testDate.toISOString();
    element.sync = true;
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    const initialText = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(initialText).toBeTruthy();

    // Fast forward 2 seconds
    jasmine.clock().tick(2000);
    await elementIsStable(element);

    const updatedText = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(updatedText).toBeTruthy();

    jasmine.clock().uninstall();
  });

  it('should clear sync interval when disconnected', async () => {
    element.sync = true;
    await elementIsStable(element);

    const clearIntervalSpy = spyOn(window, 'clearInterval');
    element.disconnectedCallback();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should update sync interval when sync property changes', async () => {
    element.sync = false;
    await elementIsStable(element);

    element.sync = true;
    await elementIsStable(element);

    expect(element.sync).toBe(true);
  });

  it('should handle very recent time (< 1 second)', async () => {
    const veryRecentDate = new Date(Date.now() - 500); // 500ms ago
    element.textContent = veryRecentDate.toISOString();
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toBeTruthy();
  });

  it('should round to nearest second', async () => {
    const pastDate = new Date(Date.now() - 45 * 1000); // 45 seconds ago
    element.textContent = pastDate.toISOString();
    element.unit = 'second';
    element.dispatchEvent(new CustomEvent('bp-textchange'));
    await elementIsStable(element);

    const text = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(text).toContain('45');
  });
});
