import { html } from 'lit';
import '@blueprintui/components/include/button.js';
import { BpButton } from '@blueprintui/components/button';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button element', () => {
  let fixture: HTMLElement;
  let element: BpButton;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button>button</bp-button>`);
    element = fixture.querySelector<BpButton>('bp-button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('button');
  });

  it('should default to status neutral', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });

  it('should default to action primary (default)', async () => {
    await elementIsStable(element);
    expect(element.action).toBe(undefined);
    expect(element.getAttribute('action')).toBe(null);
  });

  it('should support different action types', async () => {
    const actions = ['primary', 'secondary', 'flat', 'inline'] as const;

    for (const action of actions) {
      element.action = action;
      await elementIsStable(element);
      expect(element.getAttribute('action')).toBe(action);
    }
  });

  it('should support different status types', async () => {
    const statuses = ['accent', 'success', 'warning', 'danger'] as const;

    for (const status of statuses) {
      element.status = status;
      await elementIsStable(element);
      expect(element.getAttribute('status')).toBe(status);
    }
  });

  it('should inherit BaseButton functionality', async () => {
    await elementIsStable(element);
    expect(typeof element.click).toBe('function');
    expect('disabled' in element).toBe(true);
    expect('pressed' in element).toBe(true);
    expect('type' in element).toBe(true);
    expect('value' in element).toBe(true);
  });

  it('should handle disabled state', async () => {
    element.disabled = true;
    await elementIsStable(element);

    expect(element.disabled).toBe(true);
    expect(element.hasAttribute('disabled')).toBe(false); // BaseButton uses internals
    expect((element as any)._internals.ariaDisabled).toBe('true');
  });

  it('should handle pressed state', async () => {
    element.pressed = true;
    await elementIsStable(element);

    expect(element.pressed).toBe(true);
    expect((element as any)._internals.ariaPressed).toBe('true');
  });

  it('should handle selected state', async () => {
    element.selected = true;
    await elementIsStable(element);

    expect(element.selected).toBe(true);
  });

  it('should handle expanded state', async () => {
    element.expanded = true;
    await elementIsStable(element);

    expect(element.expanded).toBe(true);
    expect((element as any)._internals.ariaExpanded).toBe('true');
  });

  it('should handle readonly state', async () => {
    element.readonly = true;
    await elementIsStable(element);

    expect(element.readonly).toBe(true);
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--background', 'blue');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--border', '1px solid red');
    element.style.setProperty('--padding', '10px');
    element.style.setProperty('--min-width', '100px');
    element.style.setProperty('--font-size', '16px');
    element.style.setProperty('--line-height', '1.5');
    element.style.setProperty('--text-align', 'center');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('blue');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--border')).toBe('1px solid red');
    expect(element.style.getPropertyValue('--padding')).toBe('10px');
    expect(element.style.getPropertyValue('--min-width')).toBe('100px');
    expect(element.style.getPropertyValue('--font-size')).toBe('16px');
    expect(element.style.getPropertyValue('--line-height')).toBe('1.5');
    expect(element.style.getPropertyValue('--text-align')).toBe('center');
  });

  it('should handle click events', async () => {
    await elementIsStable(element);
    let clicked = false;

    element.addEventListener('click', () => (clicked = true));
    element.click();

    expect(clicked).toBe(true);
  });

  it('should support type property', async () => {
    element.type = 'submit';
    await elementIsStable(element);
    expect(element.type).toBe('submit');

    (element as any).type = 'reset';
    await elementIsStable(element);
    expect(element.type).toBe('reset');

    element.type = 'button';
    await elementIsStable(element);
    expect(element.type).toBe('button');
  });

  it('should support value property', async () => {
    element.value = 'test-value';
    await elementIsStable(element);
    expect(element.value).toBe('test-value');
  });

  it('should support anchor slot', async () => {
    fixture = await createFixture(html`
      <bp-button>
        <a slot="anchor" href="/test">Link Button</a>
        button text
      </bp-button>
    `);
    element = fixture.querySelector<BpButton>('bp-button');
    await elementIsStable(element);

    const anchor = element.querySelector('a[slot="anchor"]');
    expect(anchor).toBeTruthy();
    expect(anchor?.getAttribute('href')).toBe('/test');
  });

  it('should have proper style modules applied', async () => {
    await elementIsStable(element);
    expect((element.constructor as typeof BpButton).styles).toBeTruthy();
    expect((element.constructor as typeof BpButton).styles.length).toBe(4); // baseStyles, interactionStyles, anchorSlotStyles, styles
  });

  it('should support popovertarget attribute', async () => {
    element.setAttribute('popovertarget', 'my-popover');
    await elementIsStable(element);
    expect(element.getAttribute('popovertarget')).toBe('my-popover');
  });

  it('should support popovertargetaction attribute', async () => {
    element.popoverTargetAction = 'toggle';
    await elementIsStable(element);
    expect(element.popoverTargetAction).toBe('toggle');
  });

  it('should support commandtarget attribute', async () => {
    (element as any).commandtarget = 'my-element';
    await elementIsStable(element);
    expect((element as any).commandtarget).toBe('my-element');
  });

  it('should support command attribute', async () => {
    element.command = '--my-command';
    await elementIsStable(element);
    expect(element.command).toBe('--my-command');
  });

  it('should be focusable', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should handle form submission', async () => {
    const form = await createFixture(html`
      <form>
        <bp-button type="submit">Submit</bp-button>
      </form>
    `);

    const button = form.querySelector<BpButton>('bp-button');
    await elementIsStable(button);

    expect(button.type).toBe('submit');

    removeFixture(form);
  });
});
