import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typePopover, TypePopoverController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/components/test';

@typePopover<TypePopoverControllerTestElement>(host => ({
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

  declare typePopoverController: TypePopoverController<this>;

  render() {
    return html`
      <dialog hidden>
        <slot></slot>
      </dialog>
    `;``
  }
}

describe('type-popover.controller', () => {
  let element: TypePopoverControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<type-popover-controller-test-element hidden></type-popover-controller-test-element>`);
    element = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
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
    expect(window.getComputedStyle(element.shadowRoot.querySelector('dialog'), '::backdrop').getPropertyValue('background')).toBeDefined();
  });

  it('should close element if scroll event fires', async () => {
    element.closeOnScroll = true;
    element.hidden = false;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('dialog').hidden).toBe(false);

    const event = onceEvent(element, 'close');
    document.dispatchEvent(new CustomEvent('scroll'))
    expect((await event)).toBeTruthy();
  });
});
