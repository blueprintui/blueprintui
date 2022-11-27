import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typePopover, TypePopoverController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

@typePopover<TypePopoverControllerTestElement>(() => ({ type: 'auto' }))
@customElement('type-popover-controller-test-element')
class TypePopoverControllerTestElement extends LitElement {
  @property({ type: Boolean }) closable = false;

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
});
