import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
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
});
