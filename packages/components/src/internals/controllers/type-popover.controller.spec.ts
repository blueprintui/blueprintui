import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typePopover, TypePopoverController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';

@typePopover<TypePopoverControllerTestElement>(host => ({
  anchor: host.anchor,
  closeOnScroll: host.closeOnScroll,
  type: host.type
}))
@customElement('type-popover-controller-test-element')
class TypePopoverControllerTestElement extends LitElement {
  @property({ type: String }) accessor type: 'auto' | 'manual' | 'hint' = 'auto';

  @property({ type: Boolean }) accessor focusTrap = false;

  @property({ type: Boolean }) accessor closeOnScroll = true;

  @property({ type: String }) accessor anchor: string | HTMLElement;

  declare typePopoverController: TypePopoverController<this>;

  render() {
    return html`<slot></slot>`;
  }
}

describe('auto popover', () => {
  let element: TypePopoverControllerTestElement;
  let button: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button popovertarget="test-popover">trigger</button>
      <type-popover-controller-test-element id="test-popover"></type-popover-controller-test-element>
    `);
    element = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
    button = fixture.querySelector<HTMLButtonElement>('button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should dispatch a "toggle" event when toggled', async () => {
    await elementIsStable(element);

    const event = onceEvent(element, 'toggle');
    element.showPopover();
    expect(await event).toBeTruthy();
  });

  it('should set popover open state when opened', async () => {
    element.showPopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);
  });

  it('should remove popover open state when closed', async () => {
    element.showPopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);

    element.hidePopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(false);
  });

  it('should close element if scroll event fires', async () => {
    element.showPopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);

    const event = onceEvent(element, 'toggle');
    document.dispatchEvent(new CustomEvent('scroll'));
    expect(await event).toBeTruthy();
    expect(element.matches(':popover-open')).toBe(false);
  });

  it('should assign anchor and positionAnchor css variables', async () => {
    const event = onceEvent(element, 'toggle');
    emulateClick(button);
    expect(await event).toBeTruthy();
    await elementIsStable(element);
    expect((element.style as any).positionAnchor.includes('--')).toBe(true);
    expect((button.style as any).anchorName.includes('--')).toBe(true);
    expect((button.style as any).anchorName).toBe((element.style as any).positionAnchor);
  });
});

describe('hint popover', () => {
  let element: TypePopoverControllerTestElement;
  let trigger: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button popovertarget="hint-test">trigger</button>
      <type-popover-controller-test-element id="hint-test" type="hint"></type-popover-controller-test-element>
    `);
    element = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
    trigger = fixture.querySelector<HTMLButtonElement>('button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should trigger toggle open event on focus of hint', async () => {
    const event = onceEvent(element, 'toggle');
    trigger.dispatchEvent(new CustomEvent('focus'));
    await elementIsStable(element);
    expect((await event).newState).toBe('open');
    expect(element.matches(':popover-open')).toBe(true);
  });

  it('should trigger toggle close event on focusout of hint', async () => {
    element.showPopover();
    const event = onceEvent(element, 'toggle');
    trigger.dispatchEvent(new CustomEvent('focusout'));
    await elementIsStable(element);
    expect((await event).newState).toBe('closed');
    expect(element.matches(':popover-open')).toBe(false);
  });

  it('should trigger toggle open event on mousemove of hint', async () => {
    const event = onceEvent(element, 'toggle');
    trigger.dispatchEvent(new CustomEvent('mousemove'));
    await elementIsStable(element);
    expect((await event).newState).toBe('open');
    expect(element.matches(':popover-open')).toBe(true);
  });

  it('should trigger toggle close event on mouseleave of hint', async () => {
    element.showPopover();
    const event = onceEvent(element, 'toggle');
    trigger.dispatchEvent(new CustomEvent('mouseleave'));
    await elementIsStable(element);
    expect((await event).newState).toBe('closed');
    expect(element.matches(':popover-open')).toBe(false);
  });
});

describe('explicit anchor', () => {
  let popover1: TypePopoverControllerTestElement;
  let button2: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button id="btn-1" popovertarget="popover-1">trigger</button>
      <button id="btn-2">anchor</button>
      <type-popover-controller-test-element id="popover-1" anchor="btn-2"></type-popover-controller-test-element>
    `);
    popover1 = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
    button2 = fixture.querySelector<HTMLButtonElement>('#btn-2');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should set popover open state when opened', async () => {
    popover1.showPopover();
    await elementIsStable(popover1);
    expect(popover1.matches(':popover-open')).toBe(true);
    expect(popover1.anchor).toBe('btn-2');
    expect((popover1.style as any).positionAnchor.includes('--')).toBe(true);
    expect((button2.style as any).anchorName.includes('--')).toBe(true);
    expect((button2.style as any).anchorName).toBe((popover1.style as any).positionAnchor);
  });
});

describe('command behavior', () => {
  let element: TypePopoverControllerTestElement;
  let button: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button commandfor="test-popover" command="toggle-popover">trigger</button>
      <type-popover-controller-test-element id="test-popover"></type-popover-controller-test-element>
    `);
    element = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
    button = fixture.querySelector<HTMLButtonElement>('button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should listen for invoker commands', async () => {
    expect(element.matches(':popover-open')).toBe(false);

    const commandEvent = onceEvent(element, 'command');
    const toggleEvent = onceEvent(element, 'toggle');
    emulateClick(button);
    const { source, command } = await commandEvent;
    await toggleEvent;
    await elementIsStable(element);
    expect(source).toBe(button);
    expect(command).toBe('toggle-popover');
  });
});
