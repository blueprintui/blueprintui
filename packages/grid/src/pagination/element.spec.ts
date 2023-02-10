import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/components/test';
import { BpSelect, BpOption } from '@blueprintui/components/select';
import { BpInput } from '@blueprintui/components/input';
import { BpGridPagination } from './element.js';
import { BpButtonIcon } from '@blueprintui/components/button-icon/element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/pagination.js';

describe('bp-grid-pagination', () => {
  let component: BpGridPagination;
  let element: HTMLElement;
  let pageInput: BpInput;
  let pageSizeInput: BpSelect;

  beforeEach(async () => {
    element = await createFixture(html`<bp-grid-pagination page-size-options="[10, 20, 50, 100]"></bp-grid-pagination>`);
    component = element.querySelector<BpGridPagination>('bp-grid-pagination');
    pageInput = component.shadowRoot.querySelector('bp-input');
    pageSizeInput = component.shadowRoot.querySelector('bp-select');
  });

  afterEach(() => {
    removeFixture(element);
  });

  it('should create component', async () => {
    await elementIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should set current page input', async () => {
    await elementIsStable(component);
    expect(pageInput.valueAsNumber).toBe(1);

    component.page = 2;
    await elementIsStable(component);
    expect(pageInput.valueAsNumber).toBe(2);
  });

  it('should set current page size', async () => {
    await elementIsStable(component);
    expect(pageSizeInput.value).toBe('10');

    component.pageSize = 50;
    await elementIsStable(component);
    expect(pageSizeInput.value).toBe('50');
  });

  it('should set page count', async () => {
    await elementIsStable(component);
    expect(pageInput.max).toBe(1);

    component.pageCount = 50;
    await elementIsStable(component);
    expect(pageInput.max).toBe(50);
  });

  it('should set page size options', async () => {
    await elementIsStable(component);
    expect(component.pageSizeOptions).toEqual([10, 20, 50, 100]);

    component.pageSizeOptions = [10, 20, 30];
    await elementIsStable(component);
    expect(Array.from(component.shadowRoot.querySelectorAll<BpOption>('bp-option')).map(o => parseInt(o.value))).toEqual([10, 20, 30]);
  });

  it('should emit when page changes by user', async () => {
    await elementIsStable(component);
    const event = onceEvent(component, 'page');
    pageInput.valueAsNumber = 3;
    pageInput.dispatchEvent(new Event('input'));
    expect((await event).detail).toBe(3);
  });

  it('should emit when page size changes by user', async () => {
    await elementIsStable(component);
    const event = onceEvent(component, 'size');
    pageSizeInput.value = '50';
    pageSizeInput.dispatchEvent(new Event('input'));
    expect((await event).detail).toBe(50);
  });

  it('should disable previous and first buttons if on first page', async () => {
    component.page = 1;
    component.pageCount = 50;
    await elementIsStable(component);
    expect(component.shadowRoot.querySelector<BpButtonIcon>('[slot="first"]').disabled).toBe(true);
    expect(component.shadowRoot.querySelector<BpButtonIcon>('[slot="prev"]').disabled).toBe(true);
    expect(component.shadowRoot.querySelector<BpButtonIcon>('[slot="next"]').disabled).toBe(false);
    expect(component.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').disabled).toBe(false);
  });

  it('should disable last and next buttons if on last page', async () => {
    component.pageCount = 5;
    component.page = 5;
    await elementIsStable(component);
    expect(component.shadowRoot.querySelector<BpButtonIcon>('[slot="first"]').disabled).toBe(false);
    expect(component.shadowRoot.querySelector<BpButtonIcon>('[slot="prev"]').disabled).toBe(false);
    expect(component.shadowRoot.querySelector<BpButtonIcon>('[slot="next"]').disabled).toBe(true);
    expect(component.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').disabled).toBe(true);
  });

  it('should emit when `page` event when next page button is clicked', async () => {
    await elementIsStable(component);
    expect(component.page).toBe(1);
    const event = onceEvent(component, 'page');
    component.shadowRoot.querySelector<BpButtonIcon>('[slot="next"]').dispatchEvent(new Event('click'));
    expect((await event).detail).toBe(2);
  });

  it('should emit when `page` when prev page button is clicked', async () => {
    component.page = 2;
    await elementIsStable(component);
    expect(component.page).toBe(2);
    const event = onceEvent(component, 'page');

    component.shadowRoot.querySelector<BpButtonIcon>('[slot="prev"]').dispatchEvent(new Event('click'));
    expect((await event).detail).toBe(1);
  });

  it('should emit when `page` when first page button is clicked', async () => {
    component.page = 3;
    await elementIsStable(component);
    expect(component.page).toBe(3);
    const event = onceEvent(component, 'page');

    component.shadowRoot.querySelector<BpButtonIcon>('[slot="first"]').dispatchEvent(new Event('click'));
    expect((await event).detail).toBe(1);
  });

  it('should emit when `page` when last page button is clicked', async () => {
    component.page = 1;
    component.pageCount = 5;
    await elementIsStable(component);
    expect(component.page).toBe(1);
    const event = onceEvent(component, 'page');

    component.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').dispatchEvent(new Event('click'));
    expect((await event).detail).toBe(5);
  });
});
