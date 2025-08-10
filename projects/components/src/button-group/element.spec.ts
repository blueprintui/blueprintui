import { html } from 'lit';
import { BpButtonGroup } from '@blueprintui/components/button-group';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import type { BpButton } from '@blueprintui/components/button';
import type { BpButtonIcon } from '@blueprintui/components/button-icon';
import '@blueprintui/components/include/button-group.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/button.js';

describe('card element', () => {
  let fixture: HTMLElement;
  let element: BpButtonGroup;
  let buttons: BpButton[];
  let iconButtons: BpButtonIcon[];

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-button-group>
        <bp-button></bp-button>
        <bp-button-icon></bp-button-icon>
      </bp-button-group>
    `);
    element = fixture.querySelector<BpButtonGroup>('bp-button-group');
    buttons = Array.from(fixture.querySelectorAll<BpButton>('bp-button'));
    iconButtons = Array.from(fixture.querySelectorAll<BpButtonIcon>('bp-button-icon'));
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-group')).toBe(BpButtonGroup);
  });

  it('should assign action type to child buttons', async () => {
    await elementIsStable(element);
    expect(buttons[0].action).toBe(undefined);
    expect(iconButtons[0].action).toBe(undefined);
  });
});
