import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpCheckbox } from '@blueprintui/components/checkbox';
import '@blueprintui/components/include/checkbox.js';

describe('bp-checkbox', () => {
  let element: BpCheckbox;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>checkbox</label>
        <bp-checkbox></bp-checkbox>
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpCheckbox>('bp-checkbox');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should update :--checked state when input control is checked', async () => {
    await elementIsStable(element);
    expect(element.matches(':--checked')).toBe(false);

    element.checked = true;
    await elementIsStable(element);
    expect(element.matches(':--checked')).toBe(true);
  });
});