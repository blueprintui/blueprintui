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
    expect(element.matches(':state(none)')).toBe(true);
    expect(element.matches(':state(ascending)')).toBe(false);
    expect(element.matches(':state(descending)')).toBe(false);

    element.value = 'ascending';
    await elementIsStable(element);
    expect(element.matches(':state(none)')).toBe(false);
    expect(element.matches(':state(ascending)')).toBe(true);
    expect(element.matches(':state(descending)')).toBe(false);

    element.value = 'descending';
    await elementIsStable(element);
    expect(element.matches(':state(none)')).toBe(false);
    expect(element.matches(':state(ascending)')).toBe(false);
    expect(element.matches(':state(descending)')).toBe(true);
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

  it('should have default property values', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');
    expect(element.readonly).toBe(false);
    expect(element.disabled).toBe(false);
    expect(element.i18n).toBeDefined();
  });

  it('should cycle through values in correct order: none -> ascending -> descending -> none', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    // First click: none -> ascending
    emulateClick(element);
    await elementIsStable(element);
    expect(element.value).toBe('ascending');

    // Second click: ascending -> descending
    emulateClick(element);
    await elementIsStable(element);
    expect(element.value).toBe('descending');

    // Third click: descending -> none
    emulateClick(element);
    await elementIsStable(element);
    expect(element.value).toBe('none');
  });

  it('should cycle through values with arrow keys in correct order', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    // ArrowUp: none -> ascending
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    await elementIsStable(element);
    expect(element.value).toBe('ascending');

    // ArrowUp: ascending -> descending
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    await elementIsStable(element);
    expect(element.value).toBe('descending');

    // ArrowUp: descending -> none
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    await elementIsStable(element);
    expect(element.value).toBe('none');
  });

  it('should cycle backwards with ArrowDown key', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    // ArrowDown: none -> descending
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
    await elementIsStable(element);
    expect(element.value).toBe('descending');

    // ArrowDown: descending -> ascending
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
    await elementIsStable(element);
    expect(element.value).toBe('ascending');

    // ArrowDown: ascending -> none
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
    await elementIsStable(element);
    expect(element.value).toBe('none');
  });

  it('should not respond to interactions when disabled', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);
    expect(element.value).toBe('none');

    // Click should not change value
    emulateClick(element);
    await elementIsStable(element);
    expect(element.value).toBe('none');

    // Arrow keys should not change value
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    await elementIsStable(element);
    expect(element.value).toBe('none');
  });

  it('should not respond to interactions when readonly', async () => {
    await elementIsStable(element);
    element.readonly = true;
    await elementIsStable(element);
    expect(element.value).toBe('none');

    // Click should not change value
    emulateClick(element);
    await elementIsStable(element);
    expect(element.value).toBe('none');

    // Arrow keys should not change value
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    await elementIsStable(element);
    expect(element.value).toBe('none');
  });

  it('should not emit events when disabled', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    let inputEventFired = false;
    let changeEventFired = false;

    element.addEventListener('input', () => {
      inputEventFired = true;
    });
    element.addEventListener('change', () => {
      changeEventFired = true;
    });

    emulateClick(element);
    await elementIsStable(element);

    // Wait a bit to ensure no events are fired
    await new Promise(resolve => setTimeout(resolve, 10));

    // Events should not have been fired
    expect(inputEventFired).toBe(false);
    expect(changeEventFired).toBe(false);
  });

  it('should not emit events when readonly', async () => {
    await elementIsStable(element);
    element.readonly = true;
    await elementIsStable(element);

    let inputEventFired = false;
    let changeEventFired = false;

    element.addEventListener('input', () => {
      inputEventFired = true;
    });
    element.addEventListener('change', () => {
      changeEventFired = true;
    });

    emulateClick(element);
    await elementIsStable(element);

    // Wait a bit to ensure no events are fired
    await new Promise(resolve => setTimeout(resolve, 10));

    // Events should not have been fired
    expect(inputEventFired).toBe(false);
    expect(changeEventFired).toBe(false);
  });

  it('should not respond to non-arrow keys', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('none');

    // Test various non-arrow keys
    const nonArrowKeys = ['Enter', 'Space', 'Tab', 'Escape', 'Home', 'End', 'PageUp', 'PageDown'];

    for (const key of nonArrowKeys) {
      element.dispatchEvent(new KeyboardEvent('keydown', { code: key, bubbles: true }));
      await elementIsStable(element);
      expect(element.value).toBe('none');
    }
  });

  it('should support custom i18n strings', async () => {
    await elementIsStable(element);
    const customI18n = {
      ...element.i18n,
      sort: 'Custom Sort',
      none: 'No Sort',
      ascending: 'Sort Up',
      descending: 'Sort Down'
    };

    element.i18n = customI18n;
    await elementIsStable(element);

    // ariaLabel is set in connectedCallback, so it won't update dynamically
    // But ariaValueText and ariaValueNow should update
    expect(element._internals.ariaValueText).toBe('No Sort');
    expect(element._internals.ariaValueNow).toBe('No Sort');

    // Change value and verify custom i18n is used
    element.value = 'ascending';
    await elementIsStable(element);
    expect(element._internals.ariaValueText).toBe('Sort Up');
    expect(element._internals.ariaValueNow).toBe('Sort Up');
  });

  it('should handle wrap-around behavior correctly', async () => {
    await elementIsStable(element);

    // Start from descending and go up
    element.value = 'descending';
    await elementIsStable(element);

    emulateClick(element);
    await elementIsStable(element);
    expect(element.value).toBe('none');

    // Start from ascending and go down
    element.value = 'ascending';
    await elementIsStable(element);

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
    await elementIsStable(element);
    expect(element.value).toBe('none');
  });

  it('should update form value when clicking to change state', async () => {
    const formFixture = await createFixture(html`
      <form>
        <bp-button-sort name="sort"></bp-button-sort>
      </form>
    `);
    const sortElement = formFixture.querySelector<BpButtonSort>('bp-button-sort');
    await elementIsStable(sortElement);

    const form = formFixture.querySelector('form');

    // Initial form value should be 'none'
    expect(new FormData(form).get('sort')).toBe('none');

    // Click to change to 'ascending'
    emulateClick(sortElement);
    await elementIsStable(sortElement);
    expect(sortElement.value).toBe('ascending');
    expect(new FormData(form).get('sort')).toBe('ascending');

    // Click again to change to 'descending'
    emulateClick(sortElement);
    await elementIsStable(sortElement);
    expect(sortElement.value).toBe('descending');
    expect(new FormData(form).get('sort')).toBe('descending');

    // Click again to change back to 'none'
    emulateClick(sortElement);
    await elementIsStable(sortElement);
    expect(sortElement.value).toBe('none');
    expect(new FormData(form).get('sort')).toBe('none');

    removeFixture(formFixture);
  });
});
