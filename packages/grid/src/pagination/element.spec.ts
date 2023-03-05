import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/components/test';
import { BpSelect, BpOption } from '@blueprintui/components/select';
import { BpInput } from '@blueprintui/components/input';
import { BpGridPagination } from './element.js';
import { BpButtonIcon } from '@blueprintui/components/button-icon/element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/pagination.js';

describe('bp-grid-pagination', () => {
  let element: BpGridPagination;
  let fixture: HTMLElement;
  let pageInput: BpInput;
  let pageSizeInput: BpSelect;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<bp-grid-pagination page-size-options="[10, 20, 50, 100]"></bp-grid-pagination>`
    );
    element = fixture.querySelector<BpGridPagination>('bp-grid-pagination');
    pageInput = element.shadowRoot.querySelector('bp-input');
    pageSizeInput = element.shadowRoot.querySelector('bp-select');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should set current page input', async () => {
    await elementIsStable(element);
    expect(pageInput.valueAsNumber).toBe(1);

    element.page = 2;
    await elementIsStable(element);
    expect(pageInput.valueAsNumber).toBe(2);
  });

  it('should set current page size', async () => {
    await elementIsStable(element);
    expect(pageSizeInput.value).toBe('10');

    element.pageSize = 50;
    await elementIsStable(element);
    expect(pageSizeInput.value).toBe('50');
  });

  it('should set page count', async () => {
    await elementIsStable(element);
    expect(pageInput.max).toBe(1);

    element.pageCount = 50;
    await elementIsStable(element);
    expect(pageInput.max).toBe(50);
  });

  it('should set page size options', async () => {
    await elementIsStable(element);
    expect(element.pageSizeOptions).toEqual([10, 20, 50, 100]);

    element.pageSizeOptions = [10, 20, 30];
    await elementIsStable(element);
    expect(Array.from(element.shadowRoot.querySelectorAll<BpOption>('bp-option')).map(o => parseInt(o.value))).toEqual([
      10, 20, 30
    ]);
  });

  it('should emit when page changes by user', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'page');
    pageInput.valueAsNumber = 3;
    pageInput.dispatchEvent(new Event('input'));
    expect((await event).detail).toBe(3);
  });

  it('should emit when page size changes by user', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'size');
    pageSizeInput.value = '50';
    pageSizeInput.dispatchEvent(new Event('input'));
    expect((await event).detail).toBe(50);
  });

  it('should disable previous and first buttons if on first page', async () => {
    element.page = 1;
    element.pageCount = 50;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="first"]').disabled).toBe(true);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="prev"]').disabled).toBe(true);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="next"]').disabled).toBe(false);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').disabled).toBe(false);
  });

  it('should disable last and next buttons if on last page', async () => {
    element.pageCount = 5;
    element.page = 5;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="first"]').disabled).toBe(false);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="prev"]').disabled).toBe(false);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="next"]').disabled).toBe(true);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').disabled).toBe(true);
  });

  it('should emit when `page` event when next page button is clicked', async () => {
    await elementIsStable(element);
    expect(element.page).toBe(1);
    const event = onceEvent(element, 'page');
    element.shadowRoot.querySelector<BpButtonIcon>('[slot="next"]').dispatchEvent(new Event('click'));
    expect((await event).detail).toBe(2);
  });

  it('should emit when `page` when prev page button is clicked', async () => {
    element.page = 2;
    await elementIsStable(element);
    expect(element.page).toBe(2);
    const event = onceEvent(element, 'page');

    element.shadowRoot.querySelector<BpButtonIcon>('[slot="prev"]').dispatchEvent(new Event('click'));
    expect((await event).detail).toBe(1);
  });

  it('should emit when `page` when first page button is clicked', async () => {
    element.page = 3;
    await elementIsStable(element);
    expect(element.page).toBe(3);
    const event = onceEvent(element, 'page');

    element.shadowRoot.querySelector<BpButtonIcon>('[slot="first"]').dispatchEvent(new Event('click'));
    expect((await event).detail).toBe(1);
  });

  it('should emit when `page` when last page button is clicked', async () => {
    element.page = 1;
    element.pageCount = 5;
    await elementIsStable(element);
    expect(element.page).toBe(1);
    const event = onceEvent(element, 'page');

    element.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').dispatchEvent(new Event('click'));
    expect((await event).detail).toBe(5);
  });
});
