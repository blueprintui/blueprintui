import { html } from 'lit';
import { BpTreeItem } from '@blueprintui/components/tree';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';
import '@blueprintui/components/include/tree.js';

describe('bp-tree-item', () => {
  let fixture: HTMLElement;
  let element: BpTreeItem;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <bp-tree-item>
        <bp-tree-item>one</bp-tree-item>
        <bp-tree-item>two</bp-tree-item>
        <bp-tree-item>three</bp-tree-item>
      </bp-tree-item>`
    );
    element = fixture.querySelector<BpTreeItem>('bp-tree-item');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-tree-item')).toBe(BpTreeItem);
  });

  it('should have a defaut role of treeitem', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('treeitem');
  });

  it('should assign itself to the slot "items"', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('items');
  });

  it('should activate items slot if there are child items and its expanded', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[name=items]')).toBe(null);

    element.expanded = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[name=items]').tagName).toBe('SLOT');
  });

  it('should display expand icon if there are child items', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-expand').tagName).toBe('BP-BUTTON-EXPAND');
  });

  it('should update expand icon checked stated based on item expand state', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-expand').checked).toBe(undefined);

    element.expanded = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-expand').checked).toBe(true);
  });

  it('should emit open/close events when expand button is clicked', async () => {
    element.selectable = 'multi';
    await elementIsStable(element);

    const expand = element.shadowRoot.querySelector('bp-button-expand');
    const open = onceEvent(element, 'open');

    expand.click();
    await open;
    expect(open).toBeTruthy();

    element.expanded = true;
    const close = onceEvent(element, 'close');
    expand.click();
    await close;
    expect(close).toBeTruthy();
  });

  it('should display checkbox if item is selectable multi', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-checkbox')?.tagName).toBe(undefined);

    element.selectable = 'multi';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-checkbox').tagName).toBe('BP-CHECKBOX');
  });

  it('should update checkbox checked state based on item selected state', async () => {
    element.selectable = 'multi';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-checkbox').checked).toBe(false);

    element.selected = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-checkbox').checked).toBe(true);
  });

  it('should update checkbox indeterminate state based on item indeterminate state', async () => {
    element.selectable = 'multi';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-checkbox').indeterminate).toBe(false);

    element.indeterminate = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-checkbox').indeterminate).toBe(true);
  });

  // Additional test cases for missing functionality

  it('should support inherited disabled property', async () => {
    await elementIsStable(element);
    expect(element.disabled).toBeUndefined();

    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.disabled).toBe(false);
  });

  it('should support inherited readonly property', async () => {
    await elementIsStable(element);
    expect(element.readonly).toBeUndefined();

    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);

    element.readonly = false;
    await elementIsStable(element);
    expect(element.readonly).toBe(false);
  });

  it('should support expanded state with CSS states', async () => {
    await elementIsStable(element);
    expect(element.expanded).toBeUndefined();

    element.expanded = true;
    await elementIsStable(element);
    expect(element.expanded).toBe(true);
    expect(element._internals.ariaExpanded).toBe('true');

    element.expanded = false;
    await elementIsStable(element);
    expect(element.expanded).toBe(false);
    expect(element._internals.ariaExpanded).toBe('false');
  });

  it('should support selected state with CSS states', async () => {
    await elementIsStable(element);
    expect(element.selected).toBe(false);

    element.selected = true;
    await elementIsStable(element);
    expect(element.selected).toBe(true);
    expect(element._internals.ariaSelected).toBe('true');

    element.selected = false;
    await elementIsStable(element);
    expect(element.selected).toBe(false);
    expect(element._internals.ariaSelected).toBe('false');
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--background', 'red');
    element.style.setProperty('--padding', '1rem');
    element.style.setProperty('--gap', '0.5rem');
    element.style.setProperty('--height', '40px');
    element.style.setProperty('--cursor', 'pointer');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--padding')).toBe('1rem');
    expect(element.style.getPropertyValue('--gap')).toBe('0.5rem');
    expect(element.style.getPropertyValue('--height')).toBe('40px');
    expect(element.style.getPropertyValue('--cursor')).toBe('pointer');
  });

  it('should handle click interactions', async () => {
    await elementIsStable(element);

    const clickSpy = jasmine.createSpy('click');
    element.addEventListener('click', clickSpy);

    element.click();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should handle select interactions', async () => {
    await elementIsStable(element);

    // Test that select command changes selected state
    const commandEvent = new Event('command') as any;
    commandEvent.command = '--select';
    element.dispatchEvent(commandEvent);

    await elementIsStable(element);
    expect(element.selected).toBe(true);
  });

  it('should handle expand interactions', async () => {
    await elementIsStable(element);

    // Test that open command changes expanded state
    const commandEvent = new Event('command') as any;
    commandEvent.command = '--open';
    element.dispatchEvent(commandEvent);

    await elementIsStable(element);
    expect(element.expanded).toBe(true);
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);

    // Test basic ARIA attributes
    expect(element._internals.role).toBe('treeitem');

    // Test expanded state ARIA
    element.expanded = true;
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe('true');

    // Test selected state ARIA
    element.selected = true;
    await elementIsStable(element);
    expect(element._internals.ariaSelected).toBe('true');
  });

  it('should render correct CSS classes based on child items', async () => {
    await elementIsStable(element);

    // Has child items, should have 'is-group' class
    const internalElement = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalElement.classList.contains('is-group')).toBe(true);

    // Create a fixture with no child items
    const singleFixture = await createFixture(html`<bp-tree-item>single item</bp-tree-item>`);
    const singleElement = singleFixture.querySelector<BpTreeItem>('bp-tree-item');
    await elementIsStable(singleElement);

    const singleInternalElement = singleElement.shadowRoot.querySelector('[part="internal"]');
    expect(singleInternalElement.classList.contains('is-single')).toBe(true);

    removeFixture(singleFixture);
  });

  it('should not render expand button when no child items', async () => {
    const singleFixture = await createFixture(html`<bp-tree-item>single item</bp-tree-item>`);
    const singleElement = singleFixture.querySelector<BpTreeItem>('bp-tree-item');
    await elementIsStable(singleElement);

    expect(singleElement.shadowRoot.querySelector('bp-button-expand')).toBeNull();

    removeFixture(singleFixture);
  });

  it('should not render items slot when no child items', async () => {
    const singleFixture = await createFixture(html`<bp-tree-item>single item</bp-tree-item>`);
    const singleElement = singleFixture.querySelector<BpTreeItem>('bp-tree-item');
    await elementIsStable(singleElement);

    expect(singleElement.shadowRoot.querySelector('[name="items"]')).toBeNull();

    removeFixture(singleFixture);
  });

  it('should handle toggle expand correctly', async () => {
    await elementIsStable(element);

    const expandButton = element.shadowRoot.querySelector('bp-button-expand');
    expect(expandButton).toBeTruthy();

    // Initial state
    expect(element.expanded).toBeUndefined();

    // Set interaction to auto to allow toggle to work
    element.interaction = 'auto';
    await elementIsStable(element);

    // Click expand button
    expandButton.click();
    await elementIsStable(element);

    // Should be expanded now (the toggle method sets expanded to true)
    expect(element.expanded).toBe(true);
  });

  it('should render slot content correctly', async () => {
    await elementIsStable(element);

    const buttonElement = element.shadowRoot.querySelector('.button');
    expect(buttonElement).toBeTruthy();

    const slot = buttonElement.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should have proper focus management', async () => {
    await elementIsStable(element);

    // Test tabIndex behavior
    expect(element.tabIndex).toBe(0);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });
});
