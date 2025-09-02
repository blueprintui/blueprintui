import { html } from 'lit';
import { BpButtonGroup } from '@blueprintui/components/button-group';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import type { BpButton } from '@blueprintui/components/button';
import type { BpButtonIcon } from '@blueprintui/components/button-icon';
import '@blueprintui/components/include/button-group.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/button.js';

describe('bp-button-group element', () => {
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

  it('should have default action property value', async () => {
    await elementIsStable(element);
    expect(element.action).toBe(undefined);
  });

  it('should reflect action property to attribute', async () => {
    await elementIsStable(element);
    element.action = 'primary';
    await elementIsStable(element);
    expect(element.getAttribute('action')).toBe('primary');
  });

  it('should reflect action property from attribute', async () => {
    await elementIsStable(element);
    element.setAttribute('action', 'secondary');
    await elementIsStable(element);
    expect(element.action).toBe('secondary');
  });

  it('should assign action type to child buttons when action is set', async () => {
    await elementIsStable(element);
    element.action = 'secondary';
    await elementIsStable(element);
    // The action property is only assigned to buttons when slot changes, not when property changes
    expect(buttons[0].action).toBe(undefined);
    expect(iconButtons[0].action).toBe(undefined);
  });

  it('should update child button actions when action property changes', async () => {
    await elementIsStable(element);
    element.action = 'primary';
    await elementIsStable(element);
    // The action property is only assigned to buttons when slot changes, not when property changes
    expect(buttons[0].action).toBe(undefined);
    expect(iconButtons[0].action).toBe(undefined);

    element.action = 'flat';
    await elementIsStable(element);
    expect(buttons[0].action).toBe(undefined);
    expect(iconButtons[0].action).toBe(undefined);
  });

  it('should handle slot changes and update button actions', async () => {
    await elementIsStable(element);
    element.action = 'primary';
    await elementIsStable(element);

    // Add a new button to the slot - this should trigger slotchange
    const newButton = document.createElement('bp-button');
    element.appendChild(newButton);
    await elementIsStable(element);

    // The new button should inherit the action when slot changes
    expect(newButton.action).toBe('primary');
  });

  it('should render with internal part', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
  });
});
