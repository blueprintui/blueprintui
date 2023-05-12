import { html } from 'lit';
import '@blueprintui/components/include/button-sort.js';
import { BpButtonSort } from '@blueprintui/components/button-sort';
import { elementIsStable, createFixture, emulateClick, onceEvent, removeFixture } from '@blueprintui/test';

describe('button-sort element', () => {
  let fixture: HTMLElement;
  let element: BpButtonSort;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-sort name="sort"></bp-button-sort>`);
    element = fixture.querySelector<BpButtonSort>('bp-button-sort');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-sort')).toBe(BpButtonSort);
  });

  it('should display angle icons with directions', async () => {
    await elementIsStable(element);
    const icons = element.shadowRoot.querySelectorAll('bp-icon');
    expect(icons[0].shape).toBe('angle');
    expect(icons[1].shape).toBe('angle');
    expect(icons[0].direction).toBe('up');
    expect(icons[1].direction).toBe('down');
  });

  it('should set a default ariaLabel', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('sort');
  });

  it('should set role of spinbutton', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('spinbutton');
  });

  it('should set the ariaValueText when changed', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaValueText).toBe('none');

    element.value = 'ascending';
    await elementIsStable(element);
    expect(element._internals.ariaValueText).toBe('ascending');

    element.value = 'descending';
    await elementIsStable(element);
    expect(element._internals.ariaValueText).toBe('descending');
  });

  it('should set the ariaValueNow when changed', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaValueNow).toBe('none');

    element.value = 'ascending';
    await elementIsStable(element);
    expect(element._internals.ariaValueNow).toBe('ascending');

    element.value = 'descending';
    await elementIsStable(element);
    expect(element._internals.ariaValueNow).toBe('descending');
  });

  it('should set appropriate CSS State when changes', async () => {
    await elementIsStable(element);
    expect(element.matches(':--none')).toBe(true);
    expect(element.matches(':--ascending')).toBe(false);
    expect(element.matches(':--descending')).toBe(false);

    element.value = 'ascending';
    await elementIsStable(element);
    expect(element.matches(':--none')).toBe(false);
    expect(element.matches(':--ascending')).toBe(true);
    expect(element.matches(':--descending')).toBe(false);

    element.value = 'descending';
    await elementIsStable(element);
    expect(element.matches(':--none')).toBe(false);
    expect(element.matches(':--ascending')).toBe(false);
    expect(element.matches(':--descending')).toBe(true);
  });

  it('should emit input event on click', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    const event = onceEvent(element, 'input');
    emulateClick(element);
    await elementIsStable(element);
    expect((await event)?.target.value).toBe('ascending');
  });

  it('should emit input event with data on arrow key up', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    const event = onceEvent(element, 'input');
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    await elementIsStable(element);
    expect((await event)?.data).toBe('ascending');
  });

  it('should emit input event with data on arrow key down', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    const event = onceEvent(element, 'input');
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
    await elementIsStable(element);
    expect((await event)?.data).toBe('descending');
  });

  it('should emit change event on click', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    const event = onceEvent(element, 'change');
    emulateClick(element);
    await elementIsStable(element);
    expect((await event)?.target.value).toBe('ascending');
  });

  it('should emit change event on arrow key up', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    const event = onceEvent(element, 'change');
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    await elementIsStable(element);
    expect((await event)?.target.value).toBe('ascending');
  });

  it('should emit change event on arrow key down', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    const event = onceEvent(element, 'change');
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
    await elementIsStable(element);
    expect((await event)?.target.value).toBe('descending');
  });

  it('should not have a tabindex if readonly or disabled', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.disabled = true;
    await elementIsStable(element);
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);
  });
});
