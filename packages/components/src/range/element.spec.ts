import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpRange } from '@blueprintui/components/range';
import '@blueprintui/components/include/range.js';

describe('bp-range', () => {
  let element: BpRange;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>range</label>
        <bp-range></bp-range>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpRange>('bp-range');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-range')).toBe(BpRange);
  });
});
