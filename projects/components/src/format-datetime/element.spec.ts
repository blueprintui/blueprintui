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
});
