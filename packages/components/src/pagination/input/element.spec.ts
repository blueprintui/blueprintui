import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/components/test';
import { BpSelect, BpOption } from '@blueprintui/components/select';
import { BpInput } from '@blueprintui/components/input';
import { BpPaginationInput } from '@blueprintui/components/pagination';
import { BpButtonIcon } from '@blueprintui/components/button-icon/element.js';
import '@blueprintui/components/include/pagination.js';

describe('bp-pagination-input', () => {
  let element: BpPaginationInput;
  let fixture: HTMLElement;
  let pageInput: BpInput;
  let pageSizeInput: BpSelect;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<form><bp-pagination-input name="pagination" size-options="[10, 20, 50, 100]"></bp-pagination-input></form>`
    );
    element = fixture.querySelector<BpPaginationInput>('bp-pagination-input');
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

    element.value = 2;
    await elementIsStable(element);
    expect(pageInput.valueAsNumber).toBe(2);
  });

  it('should set current page size', async () => {
    await elementIsStable(element);
    expect(pageSizeInput.value).toBe('10');

    element.size = 50;
    await elementIsStable(element);
    expect(pageSizeInput.value).toBe('50');
  });

  it('should set page count', async () => {
    await elementIsStable(element);
    expect(pageInput.max).toBe(1);

    element.max = 50;
    await elementIsStable(element);
    expect(pageInput.max).toBe(50);
  });

  it('should set page size options', async () => {
    await elementIsStable(element);
    expect(element.sizeOptions).toEqual([10, 20, 50, 100]);

    element.sizeOptions = [10, 20, 30];
    await elementIsStable(element);
    expect(Array.from(element.shadowRoot.querySelectorAll<BpOption>('bp-option')).map(o => parseInt(o.value))).toEqual([
      10, 20, 30
    ]);
  });

  it('should emit form control "change" event when page changes by user', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'change');
    pageInput.valueAsNumber = 3;
    pageInput.dispatchEvent(new Event('input'));
    await event;
    expect(element.value).toBe(3);
  });

  it('should emit when page size changes by user', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'size');
    pageSizeInput.value = '50';
    pageSizeInput.dispatchEvent(new Event('input'));
    expect((await event).detail).toBe(50);
  });

  it('should disable previous and first buttons if on first page', async () => {
    element.size = 1;
    element.max = 50;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="first"]').disabled).toBe(true);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="prev"]').disabled).toBe(true);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="next"]').disabled).toBe(false);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').disabled).toBe(false);
  });

  it('should disable last and next buttons if on last page', async () => {
    element.max = 5;
    element.value = 5;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="first"]').disabled).toBe(false);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="prev"]').disabled).toBe(false);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="next"]').disabled).toBe(true);
    expect(element.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').disabled).toBe(true);
  });

  it('should emit form control "change" event when next page button is clicked', async () => {
    await elementIsStable(element);
    expect(element.value).toBe(1);
    const event = onceEvent(element, 'change');
    element.shadowRoot.querySelector<BpButtonIcon>('[slot="next"]').dispatchEvent(new Event('click'));
    await event;
    expect(element.value).toBe(2);
  });

  it('should emit form control "change" event when prev page button is clicked', async () => {
    element.value = 2;
    await elementIsStable(element);
    expect(element.value).toBe(2);
    const event = onceEvent(element, 'change');
    element.shadowRoot.querySelector<BpButtonIcon>('[slot="prev"]').dispatchEvent(new Event('click'));
    await event;
    expect(element.value).toBe(1);
  });

  it('should emit form control `change` event when first page button is clicked', async () => {
    element.value = 3;
    await elementIsStable(element);
    expect(element.value).toBe(3);
    const event = onceEvent(element, 'change');
    element.shadowRoot.querySelector<BpButtonIcon>('[slot="first"]').dispatchEvent(new Event('click'));
    await event;
    expect(element.value).toBe(1);
  });

  it('should emit form control `change` event when last page button is clicked', async () => {
    element.value = 1;
    element.max = 5;
    await elementIsStable(element);
    expect(element.value).toBe(1);
    const event = onceEvent(element, 'change');

    element.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').dispatchEvent(new Event('click'));
    await event;
    expect(element.value).toBe(5);
  });

  it('should set the parent form value when changed', async () => {
    element.value = 1;
    element.max = 5;
    await elementIsStable(element);
    expect(element.value).toBe(1);
    const event = onceEvent(element, 'change');

    element.shadowRoot.querySelector<BpButtonIcon>('[slot="last"]').dispatchEvent(new Event('click'));
    const form = fixture.querySelector<HTMLFormElement>('form');
    await event;
    expect(Object.fromEntries(new FormData(form) as any).pagination).toBe('5');
  });
});
