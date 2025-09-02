import { html } from 'lit';
import { BpTree, BpTreeItem, updateSelection } from '@blueprintui/components/tree';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '@blueprintui/components/include/tree.js';

describe('bp-tree', () => {
  let fixture: HTMLElement;
  let element: BpTree;
  let items: BpTreeItem[];

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-tree>
        <bp-tree-item></bp-tree-item>
        <bp-tree-item></bp-tree-item>
        <bp-tree-item></bp-tree-item>
      </bp-tree>
    `);
    element = fixture.querySelector<BpTree>('bp-tree');
    items = Array.from(fixture.querySelectorAll<BpTreeItem>('bp-tree-item'));
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-tree')).toBe(BpTree);
  });

  it('should have a defaut role of tree', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('tree');
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.interaction).toBeUndefined();
    expect(element.selectable).toBeUndefined();
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
  });

  it('should sync the selectable state for all tree items', async () => {
    await elementIsStable(element);
    expect(items.every(i => i.selectable === 'multi')).toBe(false);

    element.selectable = 'multi';
    await elementIsStable(element);
    expect(items.every(i => i.selectable === 'multi')).toBe(true);
  });

  it('should sync the interaction state for all tree items', async () => {
    await elementIsStable(element);
    expect(items.every(i => i.interaction === 'auto')).toBe(false);

    element.interaction = 'auto';
    await elementIsStable(element);
    expect(items.every(i => i.interaction === 'auto')).toBe(true);
  });

  it('should handle multi-select click interactions', async () => {
    await elementIsStable(element);
    element.selectable = 'multi';
    element.interaction = 'auto';
    await elementIsStable(element);

    // Ensure tree items have the right properties
    items.forEach(item => {
      expect(item.selectable).toBe('multi');
      expect(item.interaction).toBe('auto');
    });

    // Click first item
    items[0].dispatchEvent(new Event('click', { bubbles: true }));
    await elementIsStable(element);
    expect(items[0].selected).toBe(true);

    // Click second item
    items[1].dispatchEvent(new Event('click', { bubbles: true }));
    await elementIsStable(element);
    expect(items[1].selected).toBe(true);
    expect(items[0].selected).toBe(true); // Should remain selected in multi-select
  });

  it('should handle single-select click interactions', async () => {
    await elementIsStable(element);
    element.selectable = 'single';
    element.interaction = 'auto';
    await elementIsStable(element);

    // Ensure tree items have the right properties
    items.forEach(item => {
      expect(item.selectable).toBe('single');
      expect(item.interaction).toBe('auto');
    });

    // Click first item
    items[0].dispatchEvent(new Event('click', { bubbles: true }));
    await elementIsStable(element);
    expect(items[0].selected).toBe(true);

    // Click second item
    items[1].dispatchEvent(new Event('click', { bubbles: true }));
    await elementIsStable(element);
    expect(items[1].selected).toBe(true);
    expect(items[0].selected).toBe(false); // Should deselect previous in single-select
  });

  it('should toggle selection on repeated clicks', async () => {
    await elementIsStable(element);
    element.selectable = 'multi';
    element.interaction = 'auto';
    await elementIsStable(element);

    // First click selects
    items[0].dispatchEvent(new Event('click', { bubbles: true }));
    await elementIsStable(element);
    expect(items[0].selected).toBe(true);

    // Second click deselects
    items[0].dispatchEvent(new Event('click', { bubbles: true }));
    await elementIsStable(element);
    expect(items[0].selected).toBe(false);
  });

  it('should not handle clicks when interaction is not auto', async () => {
    await elementIsStable(element);
    element.selectable = 'multi';
    // Don't set interaction to 'auto' to test the condition
    await elementIsStable(element);

    items[0].dispatchEvent(new Event('click', { bubbles: true }));
    await elementIsStable(element);
    expect(items[0].selected).toBe(false); // Should not change
  });

  it('should not handle clicks on non-tree-item elements', async () => {
    await elementIsStable(element);
    element.selectable = 'multi';
    element.interaction = 'auto';
    await elementIsStable(element);

    // Click on the tree element itself
    element.dispatchEvent(new Event('click', { bubbles: true }));
    await elementIsStable(element);
    expect(items.every(i => i.selected === false)).toBe(true);
  });

  it('should update selection when selectable property changes', async () => {
    await elementIsStable(element);
    element.selectable = 'multi';
    await elementIsStable(element);
    expect(items.every(i => i.selectable === 'multi')).toBe(true);

    element.selectable = 'single';
    await elementIsStable(element);
    expect(items.every(i => i.selectable === 'single')).toBe(true);
  });

  it('should update interaction when interaction property changes', async () => {
    await elementIsStable(element);
    element.interaction = 'auto';
    await elementIsStable(element);
    expect(items.every(i => i.interaction === 'auto')).toBe(true);
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('tree');
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
  });
});

describe('updateSelection', () => {
  let item: BpTreeItem & { selected: boolean; indeterminate: boolean };

  beforeEach(() => {
    item = document.createElement('div') as unknown as BpTreeItem;
    item.selected = false;
    item.indeterminate = false;

    item.append(document.createElement('div'), document.createElement('div'), document.createElement('div'));
    Array.from(item.children).forEach((child: any) => {
      child.selected = false;
      child.slot = 'items';
    });
  });

  it('should not change selected or indeterminate if no children changed', async () => {
    expect(item.selected).toBe(false);
    expect(item.indeterminate).toBe(false);
  });

  it('should set selected to true if all children are selected', async () => {
    Array.from(item.children).forEach((child: any) => (child.selected = true));
    updateSelection(item);
    expect(item.selected).toBe(true);
    expect(item.indeterminate).toBe(false);
  });

  it('should set item as indeterminate if any are selected', async () => {
    (item.children[0] as BpTreeItem).selected = true;
    updateSelection(item);
    expect(item.selected).toBe(false);
    expect(item.indeterminate).toBe(true);
  });

  it('should indeterminate and selected as false if all children are unselected', async () => {
    item.selected = true;
    item.indeterminate = true;

    Array.from(item.children).forEach((child: any) => (child.selected = false));
    updateSelection(item);
    expect(item.selected).toBe(false);
    expect(item.indeterminate).toBe(false);
  });

  it('should handle items with no children', async () => {
    const emptyItem = document.createElement('div') as unknown as BpTreeItem;
    emptyItem.selected = false;
    emptyItem.indeterminate = false;

    updateSelection(emptyItem);
    expect(emptyItem.selected).toBe(false);
    expect(emptyItem.indeterminate).toBe(false);
  });

  it('should handle selection states correctly', async () => {
    // Test with the existing item structure that we know works
    const testItem = document.createElement('div') as unknown as BpTreeItem;
    testItem.selected = false;
    testItem.indeterminate = false;

    // Add children with different selection states
    const child1 = document.createElement('div') as unknown as BpTreeItem;
    child1.selected = true;
    child1.slot = 'items';

    const child2 = document.createElement('div') as unknown as BpTreeItem;
    child2.selected = false;
    child2.slot = 'items';

    testItem.appendChild(child1);
    testItem.appendChild(child2);

    updateSelection(testItem);
    expect(testItem.indeterminate).toBe(true);
    expect(testItem.selected).toBe(false);
  });
});
