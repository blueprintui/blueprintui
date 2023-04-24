import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpColor } from '@blueprintui/components/color';
import '@blueprintui/components/include/color.js';

describe('bp-search', () => {
  let element: BpColor;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>color</label>
        <bp-color></bp-color>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpColor>('bp-color');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-color')).toBe(BpColor);
  });
});
