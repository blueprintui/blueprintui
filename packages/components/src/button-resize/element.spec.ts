import { html } from 'lit';
import { BpButtonResize } from '@blueprintui/components/button-resize';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';
import '@blueprintui/components/include/button-resize.js';

describe('button-resize element', () => {
  let fixture: HTMLElement;
  let element: BpButtonResize;
  let form: HTMLFormElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<form>
        <bp-button-resize tabindex="0" name="test-slider" value="50" min="0" max="100" step="10"></bp-button-resize>
      </form>`
    );
    form = fixture.querySelector('form');
    element = fixture.querySelector<BpButtonResize>('bp-button-resize');
    await element.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-resize')).toBe(BpButtonResize);
  });

  it('should add field marker attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('bp-field')).toBe('');
  });

  it('should initialize component to have role slider', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('slider');
  });

  it('should initialize component to be focusable', async () => {
    await elementIsStable(element);
    expect(element.disabled).toBe(undefined);
    expect(element.tabIndex).toBe(0);
  });

  it('should update aria-disabled based on disabled state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');

    element.disabled = true;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('true');
  });

  it('should set the form value if changed', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(undefined);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.value = '60';
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '60' });

    element.value = '10';
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '10' });
  });

  it('should set the form value via keyboard input', async () => {
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '60' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '60' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '0' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'End' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '100' });
  });

  it('should emit a input event on touch move', async () => {
    const event = onceEvent(element, 'input');
    element.dispatchEvent(new CustomEvent('bp-touch-move', { detail: { offsetX: 10 } }));
    await elementIsStable(element);
    expect((await event)?.target.value).toBe('60');
  });

  it('should emit a change event on touch end', async () => {
    const event = onceEvent(element, 'change');
    element.dispatchEvent(new CustomEvent('bp-touch-move', { detail: { offsetX: 10 } }));
    element.dispatchEvent(new CustomEvent('bp-touch-end'));
    await elementIsStable(element);
    expect((await event)?.target.value).toBe('60');
  });

  it('should not change value if the touch event is not the correct direction', async () => {
    element.dispatchEvent(new CustomEvent('bp-touch-move', { detail: { offsetY: -10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new CustomEvent('bp-touch-move', { detail: { offsetY: 10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });
  });

  it('should set the form value via touch input', async () => {
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new CustomEvent('bp-touch-move', { detail: { offsetX: 10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '60' });

    element.dispatchEvent(new CustomEvent('bp-touch-move', { detail: { offsetX: -10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.direction = 'vertical';
    await elementIsStable(element);

    element.dispatchEvent(new CustomEvent('bp-touch-move', { detail: { offsetY: -10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '40' });

    element.dispatchEvent(new CustomEvent('bp-touch-move', { detail: { offsetY: 10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });
  });
});
