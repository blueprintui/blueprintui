import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typePopover, TypePopoverController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/components/test';

@typePopover<TypePopoverControllerTestElement>(host => ({
  trigger: host.trigger,
  triggerType: host.triggerType,
  modal: host.modal,
  focusTrap: host.focusTrap,
  closeOnScroll: host.closeOnScroll,
  lightDismiss: host.lightDismiss
}))
@customElement('type-popover-controller-test-element')
class TypePopoverControllerTestElement extends LitElement {
  @property({ type: Boolean }) modal = false;

  @property({ type: Boolean }) focusTrap = false;

  @property({ type: Boolean }) closeOnScroll = true;

  @property({ type: Boolean }) lightDismiss = false;

  @property({ type: String }) trigger: string | HTMLElement;

  @property({ type: String }) triggerType: 'default' | 'hint' = 'hint';

  declare typePopoverController: TypePopoverController<this>;

  render() {
    return html`
      <dialog hidden>
        <slot></slot>
      </dialog>
    `;
    ``;
  }
}

describe('type-popover.controller', () => {
  let element: TypePopoverControllerTestElement;
  let trigger: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button id="btn">trigger</button>
      <type-popover-controller-test-element hidden trigger="btn"></type-popover-controller-test-element>
    `);
    element = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
    trigger = fixture.querySelector<HTMLButtonElement>('button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create popover controller instance', async () => {
    await elementIsStable(element);
    expect(element.typePopoverController).toBeDefined();
  });

  it('should sync internal dialog to host hidden attr', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('dialog').hidden).toBe(true);

    element.removeAttribute('hidden');
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('dialog').hidden).toBe(false);
  });

  it('should create dialog backdrop if modal true', async () => {
    element.modal = true;
    element.hidden = false;
    await elementIsStable(element);
    expect(
      window.getComputedStyle(element.shadowRoot.querySelector('dialog'), '::backdrop').getPropertyValue('background')
    ).toBeDefined();
  });

  it('should close element if scroll event fires', async () => {
    element.closeOnScroll = true;
    element.hidden = false;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('dialog').hidden).toBe(false);

    const event = onceEvent(element, 'close');
    document.dispatchEvent(new CustomEvent('scroll'));
    expect(await event).toBeTruthy();
  });

  it('should trigger open event on focus of hint', async () => {
    const event = onceEvent(element, 'open');
    trigger.dispatchEvent(new CustomEvent('focus'));
    expect(await event).toBeTruthy();
  });

  it('should trigger close event on focus out of hint', async () => {
    const event = onceEvent(element, 'close');
    trigger.dispatchEvent(new CustomEvent('focusout'));
    expect(await event).toBeTruthy();
  });

  it('should trigger open event on mousemove of hint', async () => {
    const event = onceEvent(element, 'open');
    trigger.dispatchEvent(new CustomEvent('mousemove'));
    expect(await event).toBeTruthy();
  });

  it('should trigger close event on mouseleave of hint', async () => {
    const event = onceEvent(element, 'close');
    trigger.dispatchEvent(new CustomEvent('mouseleave'));
    expect(await event).toBeTruthy();
  });

  it('should trigger open event on click', async () => {
    const event = onceEvent(element, 'open');
    trigger.dispatchEvent(new CustomEvent('click'));
    expect(await event).toBeTruthy();
  });
});
