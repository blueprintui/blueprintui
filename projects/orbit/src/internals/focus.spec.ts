import { html, LitElement } from 'lit';
import { createFixture, removeFixture } from '@blueprintui/test';
import { createFocusTrap, getFlattenedFocusableItems, focusable } from './focus.js';

class FocusTrapTestElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('focus-trap-test', FocusTrapTestElement);

describe('focusable', () => {
  it('should match anchor elements with href', () => {
    const el = document.createElement('a');
    el.setAttribute('href', '#');
    document.body.appendChild(el);
    expect(focusable(el)).toBe(true);
    el.remove();
  });

  it('should not match anchor elements without href', () => {
    const el = document.createElement('a');
    document.body.appendChild(el);
    expect(focusable(el)).toBe(false);
    el.remove();
  });

  it('should match input elements', () => {
    const el = document.createElement('input');
    document.body.appendChild(el);
    expect(focusable(el)).toBe(true);
    el.remove();
  });

  it('should not match disabled input elements', () => {
    const el = document.createElement('input');
    el.disabled = true;
    document.body.appendChild(el);
    expect(focusable(el)).toBe(false);
    el.remove();
  });

  it('should match button elements', () => {
    const el = document.createElement('button');
    document.body.appendChild(el);
    expect(focusable(el)).toBe(true);
    el.remove();
  });

  it('should not match disabled button elements', () => {
    const el = document.createElement('button');
    el.disabled = true;
    document.body.appendChild(el);
    expect(focusable(el)).toBe(false);
    el.remove();
  });

  it('should match elements with tabindex', () => {
    const el = document.createElement('div');
    el.setAttribute('tabindex', '0');
    document.body.appendChild(el);
    expect(focusable(el)).toBe(true);
    el.remove();
  });

  it('should match elements with tabindex -1', () => {
    const el = document.createElement('div');
    el.setAttribute('tabindex', '-1');
    document.body.appendChild(el);
    expect(focusable(el)).toBe(true);
    el.remove();
  });

  it('should match contenteditable elements', () => {
    const el = document.createElement('div');
    el.setAttribute('contenteditable', 'true');
    document.body.appendChild(el);
    expect(focusable(el)).toBe(true);
    el.remove();
  });

  it('should match elements with role=button that are not disabled', () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'button');
    document.body.appendChild(el);
    expect(focusable(el)).toBe(true);
    el.remove();
  });

  it('should not match plain div elements', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    expect(focusable(el)).toBe(false);
    el.remove();
  });
});

describe('getFlattenedFocusableItems', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should return focusable items from light DOM', async () => {
    fixture = await createFixture(html`
      <div>
        <button>one</button>
        <span>not focusable</span>
        <input type="text" />
        <button>two</button>
      </div>
    `);

    const items = getFlattenedFocusableItems(fixture);
    expect(items.length).toBe(3);
  });

  it('should return focusable items from shadow DOM', async () => {
    fixture = await createFixture(html`
      <focus-trap-test>
        <button>slotted one</button>
        <button>slotted two</button>
      </focus-trap-test>
    `);

    const items = getFlattenedFocusableItems(fixture);
    expect(items.length).toBe(2);
  });

  it('should return empty array when no focusable items exist', async () => {
    fixture = await createFixture(html`
      <div>
        <span>not focusable</span>
        <p>also not focusable</p>
      </div>
    `);

    const items = getFlattenedFocusableItems(fixture);
    expect(items.length).toBe(0);
  });
});

describe('createFocusTrap', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should wrap focus from last to first element on Tab', async () => {
    fixture = await createFixture(html`
      <div id="trap">
        <button id="first">first</button>
        <button id="second">second</button>
        <button id="last">last</button>
      </div>
    `);

    const trap = fixture.querySelector('#trap') as HTMLElement;
    const first = fixture.querySelector('#first') as HTMLButtonElement;
    const last = fixture.querySelector('#last') as HTMLButtonElement;

    createFocusTrap(trap);
    last.focus();

    const event = new KeyboardEvent('keydown', { code: 'Tab', bubbles: true });
    const preventSpy = spyOn(event, 'preventDefault');
    trap.dispatchEvent(event);

    expect(preventSpy).toHaveBeenCalled();
    expect(document.activeElement).toBe(first);
  });

  it('should wrap focus from first to last element on Shift+Tab', async () => {
    fixture = await createFixture(html`
      <div id="trap">
        <button id="first">first</button>
        <button id="second">second</button>
        <button id="last">last</button>
      </div>
    `);

    const trap = fixture.querySelector('#trap') as HTMLElement;
    const first = fixture.querySelector('#first') as HTMLButtonElement;
    const last = fixture.querySelector('#last') as HTMLButtonElement;

    createFocusTrap(trap);
    first.focus();

    const event = new KeyboardEvent('keydown', { code: 'Tab', shiftKey: true, bubbles: true });
    const preventSpy = spyOn(event, 'preventDefault');
    trap.dispatchEvent(event);

    expect(preventSpy).toHaveBeenCalled();
    expect(document.activeElement).toBe(last);
  });

  it('should not trap focus when element is hidden', async () => {
    fixture = await createFixture(html`
      <div id="trap" hidden>
        <button id="first">first</button>
        <button id="last">last</button>
      </div>
    `);

    const trap = fixture.querySelector('#trap') as HTMLElement;

    createFocusTrap(trap);

    const event = new KeyboardEvent('keydown', { code: 'Tab', bubbles: true });
    const preventSpy = spyOn(event, 'preventDefault');
    trap.dispatchEvent(event);

    expect(preventSpy).not.toHaveBeenCalled();
  });

  it('should support cleanup via AbortSignal', async () => {
    fixture = await createFixture(html`
      <div id="trap">
        <button id="first">first</button>
        <button id="last">last</button>
      </div>
    `);

    const trap = fixture.querySelector('#trap') as HTMLElement;
    const last = fixture.querySelector('#last') as HTMLButtonElement;
    const controller = new AbortController();

    createFocusTrap(trap, { signal: controller.signal });
    controller.abort();

    last.focus();

    const event = new KeyboardEvent('keydown', { code: 'Tab', bubbles: true });
    const preventSpy = spyOn(event, 'preventDefault');
    trap.dispatchEvent(event);

    expect(preventSpy).not.toHaveBeenCalled();
  });
});
