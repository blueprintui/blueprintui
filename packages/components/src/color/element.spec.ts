import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpColor } from '@blueprintui/components/color';
import '@blueprintui/components/include/color.js';

describe('bp-search', () => {
  let element: BpColor;
  let fixture: HTMLElement;
  let input: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-color>
        <label>color</label>
        <input type="color" />
        <bp-field-message>message test</bp-field-message>
      </bp-color>
    `);

    element = fixture.querySelector<BpColor>('bp-color');
    input = element.querySelector<HTMLElement>('input');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
    expect(input).toBeTruthy();
  });
});
