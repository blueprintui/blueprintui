import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpTextarea } from '@blueprintui/components/textarea';
import '@blueprintui/components/include/textarea.js';

describe('bp-textarea', () => {
  let element: BpTextarea;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>textarea</label>
        <bp-textarea></bp-textarea>
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpTextarea>('bp-textarea');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-textarea')).toBe(BpTextarea);
  });
});
