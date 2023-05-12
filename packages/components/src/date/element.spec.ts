import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpDate } from '@blueprintui/components/date';
import '@blueprintui/components/include/date.js';

describe('bp-date', () => {
  let element: BpDate;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>date</label>
        <bp-date></bp-date>
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpDate>('bp-date');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-date')).toBe(BpDate);
  });

  it('should apply calendar icon button', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon').shape).toBe('calendar');
  });

  it('should allow value to be set and retreived as date', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('');

    element.value = '2018-07-22';
    await elementIsStable(element);
    expect(element.value).toBe('2018-07-22');
    expect(element.valueAsDate.toISOString()).toBe(new Date('2018-07-22').toISOString());

    element.valueAsDate = new Date('2019-12-31');
    await elementIsStable(element);
    expect(element.value).toBe('2019-12-31');
    expect(element.valueAsDate.toISOString()).toBe(new Date('2019-12-31').toISOString());
  });
});
