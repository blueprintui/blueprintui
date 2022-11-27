import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpDate } from '@blueprintui/components/date';
import '@blueprintui/components/include/date.js';

describe('bp-date', () => {
  let element: BpDate;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-date>
        <label>date</label>
        <input type="date" />
        <bp-field-message>message text</bp-field-message>
      </bp-date>
    `);

    element = fixture.querySelector<BpDate>('bp-date');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
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
