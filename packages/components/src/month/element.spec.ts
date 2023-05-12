import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpMonth } from '@blueprintui/components/month';
import '@blueprintui/components/include/month.js';

describe('bp-time', () => {
  let element: BpMonth;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>time</label>
        <bp-month></bp-month>
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);
    element = fixture.querySelector<BpMonth>('bp-month');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-month')).toBe(BpMonth);
  });

  it('should default its input type to "month"', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('month');
  });

  it('should render the calendar icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-button-icon');
    expect(icon.shape).toBe('calendar');
  });

  it('should disable time button if input is disabled', async () => {
    const icon = element.shadowRoot.querySelector('bp-button-icon');
    await elementIsStable(element);
    expect(icon.disabled).toBe(undefined);

    element.disabled = true;
    await elementIsStable(element);
    expect(icon.disabled).toBe(true);
  });
});
