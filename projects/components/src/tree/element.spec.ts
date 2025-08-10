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
});
