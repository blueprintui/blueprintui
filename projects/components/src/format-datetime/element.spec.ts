import { html } from 'lit';
import '@blueprintui/components/include/format-datetime.js';
import { BpFormatDatetime } from '@blueprintui/components/format-datetime';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-format-datetime', () => {
  let fixture: HTMLElement;
  let element: BpFormatDatetime;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-format-datetime></bp-format-datetime>`);
    element = fixture.querySelector<BpFormatDatetime>('bp-format-datetime');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-format-datetime')).toBe(BpFormatDatetime);
  });

  it('should set role of time', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('time');
  });

  it('should format a given time', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    element.dateStyle = 'long';
    element.timeStyle = 'long';
    await elementIsStable(element);

    const format = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'long' }).format(
      new Date(element.textContent)
    );
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should handle different date styles', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    const dateStyles = ['full', 'long', 'medium', 'short'] as const;

    for (const dateStyle of dateStyles) {
      element.dateStyle = dateStyle;
      await elementIsStable(element);

      const format = new Intl.DateTimeFormat('en-US', { dateStyle }).format(new Date(element.textContent));
      expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
    }
  });

  it('should handle different time styles', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    const timeStyles = ['full', 'long', 'medium', 'short'] as const;

    for (const timeStyle of timeStyles) {
      element.timeStyle = timeStyle;
      await elementIsStable(element);

      const format = new Intl.DateTimeFormat('en-US', { timeStyle }).format(new Date(element.textContent));
      expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
    }
  });

  it('should handle locale changes', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    element.dateStyle = 'long';
    element.locale = 'de-DE';
    await elementIsStable(element);

    const format = new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' }).format(new Date(element.textContent));
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should handle timezone changes', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    element.timeStyle = 'long';
    element.timeZone = 'America/New_York';
    await elementIsStable(element);

    const format = new Intl.DateTimeFormat('en-US', { timeStyle: 'long', timeZone: 'America/New_York' }).format(
      new Date(element.textContent)
    );
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should update when text content changes', async () => {
    element.dateStyle = 'long';
    element.textContent = '2000-07-28T04:20:17.434Z';
    await elementIsStable(element);

    const firstFormat = element.shadowRoot.querySelector('[part=internal]').textContent;

    element.textContent = '2020-12-25T12:00:00.000Z';
    await elementIsStable(element);

    const secondFormat = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(firstFormat).not.toBe(secondFormat);
  });

  it('should handle bp-textchange event', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    element.dispatchEvent(new Event('bp-textchange'));
    await elementIsStable(element);

    const format = new Intl.DateTimeFormat('en-US').format(new Date('2000-07-28T04:20:17.434Z'));
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should handle individual date/time component properties', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    element.weekday = 'long';
    element.year = 'numeric';
    element.month = 'long';
    element.day = 'numeric';
    element.hour = '2-digit';
    element.minute = '2-digit';
    element.second = '2-digit';
    await elementIsStable(element);

    const format = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date('2000-07-28T04:20:17.434Z'));

    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should handle weekday property variations', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    const weekdayValues = ['long', 'short', 'narrow'] as const;

    for (const weekday of weekdayValues) {
      element.weekday = weekday;
      await elementIsStable(element);

      const format = new Intl.DateTimeFormat('en-US', { weekday }).format(new Date(element.textContent));
      expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
    }
  });

  it('should handle month property variations', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    const monthValues = ['numeric', '2-digit', 'long', 'short', 'narrow'] as const;

    for (const month of monthValues) {
      element.month = month;
      await elementIsStable(element);

      const format = new Intl.DateTimeFormat('en-US', { month }).format(new Date(element.textContent));
      expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
    }
  });

  it('should handle timeZoneName property', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';

    element.timeZoneName = 'long';
    await elementIsStable(element);

    const formatLong = new Intl.DateTimeFormat('en-US', { timeZoneName: 'long' }).format(new Date(element.textContent));
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(formatLong);

    element.timeZoneName = 'short';
    await elementIsStable(element);

    const formatShort = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).format(
      new Date(element.textContent)
    );
    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(formatShort);
  });

  it('should use current date as default', async () => {
    fixture = await createFixture(html`<bp-format-datetime></bp-format-datetime>`);
    element = fixture.querySelector<BpFormatDatetime>('bp-format-datetime');
    await elementIsStable(element);

    const content = element.shadowRoot.querySelector('[part=internal]').textContent;
    expect(content).toBeTruthy();
    expect(content).not.toBe('Invalid Date');
  });

  it('should handle numeric property variations', async () => {
    element.textContent = '2000-07-28T04:20:17.434Z';
    element.year = '2-digit';
    element.day = '2-digit';
    element.hour = 'numeric';
    element.minute = 'numeric';
    element.second = 'numeric';
    await elementIsStable(element);

    const format = new Intl.DateTimeFormat('en-US', {
      year: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(new Date('2000-07-28T04:20:17.434Z'));

    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBe(format);
  });

  it('should have internal part element', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
    expect(internal?.tagName).toBe('DIV');
  });

  it('should maintain role after reconnection', async () => {
    await elementIsStable(element);

    // Simulate disconnection and reconnection
    element.remove();
    fixture.appendChild(element);
    await elementIsStable(element);

    expect(element._internals.role).toBe('time');
  });

  it('should apply interactionTextChange decorator behavior', async () => {
    element.textContent = '2025-01-01T00:00:00.000Z';
    const event = new Event('bp-textchange');
    element.dispatchEvent(event);
    await elementIsStable(element);

    expect(element.shadowRoot.querySelector('[part=internal]').textContent).toBeTruthy();
  });
});
