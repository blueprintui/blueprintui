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
});
