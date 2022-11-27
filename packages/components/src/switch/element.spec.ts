import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpSwitch } from '@blueprintui/components/switch';
import '@blueprintui/components/include/switch.js';

describe('bp-switch', () => {
  let element: BpSwitch;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-switch></bp-switch>
    `);
    element = fixture.querySelector<BpSwitch>('bp-switch');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should sync host checked attr', async () => {
    await elementIsStable(element);
    expect(element.matches(':--checked')).toBe(false);

    element.checked = true;
    await elementIsStable(element);
    expect(element.matches(':--checked')).toBe(true);
  });
});
