import { html } from 'lit';
import '@blueprintui/components/include/nav.js';
import { BpNavGroup, BpNavItem } from '@blueprintui/components/nav';
import { elementIsStable, createFixture, removeFixture, emulateClick, onceEvent } from '@blueprintui/test';

describe('bp-nav-group', () => {
  let fixture: HTMLElement;
  let element: BpNavGroup;
  let items: BpNavItem[];

  beforeEach(async () => {
    fixture = await createFixture(
      html`<bp-nav-group>
        <bp-nav-item>Home</bp-nav-item>
        <bp-nav-item>Submit</bp-nav-item>
        <bp-nav-item>Settings</bp-nav-item>
      </bp-nav-group>`
    );
    element = fixture.querySelector<BpNavGroup>('bp-nav-group');
    items = Array.from(fixture.querySelectorAll<BpNavItem>('bp-nav-item'));
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-nav-group')).toBe(BpNavGroup);
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.expanded).toBe(false);
    expect(element.interaction).toBe(undefined);
  });

  it('should assign first item to starting slot', async () => {
    await elementIsStable(element);
    expect(items[0].slot).toBe('start');
  });

  it('should have base role type of treeitem', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('treeitem');
  });

  it('should not assign all other items to any slot', async () => {
    await elementIsStable(element);
    expect(items[1].slot).toBe('');
    expect(items[2].slot).toBe('');
  });

  it('should hide the group if not expanded', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<HTMLElement>('[role="group"]').hidden).toBe(true);
    expect(element.shadowRoot.querySelector<HTMLElement>('[role="group"]').inert).toBe(true);
    expect(element._internals.ariaExpanded).toBe('false');
    expect(element.matches(':state(expanded)')).toBe(false);
  });

  it('should show the group if expanded', async () => {
    element.expanded = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<HTMLElement>('[role="group"]').hidden).toBe(false);
    expect(element.shadowRoot.querySelector<HTMLElement>('[role="group"]').inert).toBe(false);
    expect(element._internals.ariaExpanded).toBe('true');
    expect(element.matches(':state(expanded)')).toBe(true);
  });

  it('should support interaction property', async () => {
    await elementIsStable(element);
    expect(element.interaction).toBe(undefined);

    element.interaction = 'auto';
    await elementIsStable(element);
    expect(element.interaction).toBe('auto');
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should update aria-expanded attribute when expanded property changes', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe('false');

    element.expanded = true;
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe('true');

    element.expanded = false;
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe('false');
  });

  it('should handle click on first nav item to toggle expanded state', async () => {
    await elementIsStable(element);
    expect(element.expanded).toBe(false);

    // The click handler is only added when the first item is not in start slot
    // Since our test already has the first item in start slot, we need to set interaction to 'auto'
    // for the controller to actually change the expanded state
    element.interaction = 'auto';
    await elementIsStable(element);

    // Click the first nav item (which is assigned to start slot)
    emulateClick(items[0]);
    await elementIsStable(element);
    expect(element.expanded).toBe(true);

    // Click again to collapse
    emulateClick(items[0]);
    await elementIsStable(element);
    expect(element.expanded).toBe(false);
  });

  it('should emit open event when expanded', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'open');

    // Use the controller directly to trigger the event
    element.interactionExpandController.open();
    await elementIsStable(element);

    expect(await event).toBeTruthy();
  });

  it('should emit close event when collapsed', async () => {
    element.expanded = true;
    await elementIsStable(element);

    const event = onceEvent(element, 'close');
    element.interactionExpandController.close();
    await elementIsStable(element);

    expect(await event).toBeTruthy();
  });

  it('should have interaction expand controller', async () => {
    await elementIsStable(element);
    expect(element.interactionExpandController).toBeDefined();
  });

  it('should handle slot change to update first item', async () => {
    await elementIsStable(element);
    expect(items[0].slot).toBe('start');

    // Remove and re-add the first item to trigger slotchange
    const firstItem = items[0];
    firstItem.remove();
    element.appendChild(firstItem);
    await elementIsStable(element);

    // Should still be assigned to start slot
    expect(firstItem.slot).toBe('start');
  });

  it('should not reassign first item if already in start slot', async () => {
    await elementIsStable(element);
    expect(items[0].slot).toBe('start');

    // Trigger slotchange again
    const slot = element.shadowRoot.querySelector('slot');
    slot.dispatchEvent(new Event('slotchange'));
    await elementIsStable(element);

    // Should still be in start slot
    expect(items[0].slot).toBe('start');
  });

  it('should handle dynamic item addition', async () => {
    await elementIsStable(element);
    const initialItemCount = items.length;

    // Add a new item
    const newItem = document.createElement('bp-nav-item');
    newItem.textContent = 'New Item';
    element.appendChild(newItem);
    await elementIsStable(element);

    // Should have one more item
    const updatedItems = Array.from(element.querySelectorAll<BpNavItem>('bp-nav-item'));
    expect(updatedItems.length).toBe(initialItemCount + 1);

    // First item should still be in start slot
    expect(updatedItems[0].slot).toBe('start');
  });

  it('should support interaction expand controller toggle method', async () => {
    await elementIsStable(element);
    expect(element.expanded).toBe(false);

    element.interaction = 'auto';
    await elementIsStable(element);

    // Test toggle from false to true
    element.interactionExpandController.toggle();
    await elementIsStable(element);
    expect(element.expanded).toBe(true);

    // Test toggle from true to false
    element.interactionExpandController.toggle();
    await elementIsStable(element);
    expect(element.expanded).toBe(false);
  });

  it('should only change expanded state when interaction is auto', async () => {
    await elementIsStable(element);
    expect(element.expanded).toBe(false);

    // Without interaction='auto', controller methods should not change expanded state
    element.interactionExpandController.open();
    await elementIsStable(element);
    expect(element.expanded).toBe(false);

    element.expanded = true;
    await elementIsStable(element);

    element.interactionExpandController.close();
    await elementIsStable(element);
    expect(element.expanded).toBe(true);

    // With interaction='auto', controller methods should change expanded state
    element.interaction = 'auto';
    await elementIsStable(element);

    element.interactionExpandController.close();
    await elementIsStable(element);
    expect(element.expanded).toBe(false);
  });
});
