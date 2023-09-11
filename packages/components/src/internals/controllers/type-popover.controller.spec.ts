import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typePopover, TypePopoverController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';

@typePopover<TypePopoverControllerTestElement>(host => ({
  trigger: host.trigger,
  closeOnScroll: host.closeOnScroll,
  type: host.type
}))
@customElement('type-popover-controller-test-element')
class TypePopoverControllerTestElement extends LitElement {
  @property({ type: String }) accessor type: 'auto' | 'manual' | 'hint' = 'auto';

  @property({ type: Boolean }) accessor focusTrap = false;

  @property({ type: Boolean }) accessor closeOnScroll = true;

  @property({ type: String }) accessor trigger: string | HTMLElement;

  declare typePopoverController: TypePopoverController<this>;

  render() {
    return html`<slot></slot>`;
  }
}

describe('auto popover', () => {
  let element: TypePopoverControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button id="btn">trigger</button>
      <type-popover-controller-test-element trigger="btn"></type-popover-controller-test-element>
    `);
    element = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
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
});

describe('hint popover', () => {
  let element: TypePopoverControllerTestElement;
  let trigger: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button id="btn">trigger</button>
      <type-popover-controller-test-element type="hint" trigger="btn"></type-popover-controller-test-element>
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
