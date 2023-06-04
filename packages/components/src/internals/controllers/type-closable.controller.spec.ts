import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typeClosable, TypeClosableController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

@typeClosable<TypeClosableControllerTestElement>()
@customElement('type-closable-controller-test-element')
class TypeClosableControllerTestElement extends LitElement {
  @property({ type: Boolean }) closable = false;

  declare typeClosableController: TypeClosableController<this>;

  render() {
    return html`<button @click=${this.typeClosableController.close}>close</button>`;
    ``;
  }
}

describe('type-closable.controller', () => {
  let element: TypeClosableControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<type-closable-controller-test-element></type-closable-controller-test-element>`
    );
    element = fixture.querySelectorAll<TypeClosableControllerTestElement>('type-closable-controller-test-element')[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create closable controller instance', async () => {
    await elementIsStable(element);
    expect(element.typeClosableController).toBeDefined();
  });

  // it('should emit close event when closable', async () => {
  //   await elementIsStable(element);
  //   const event = onceEvent(element, 'close');
  //   element.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent('click'));

  //   await event;
  //   expect(event).toBeTruthy();
  // });
});
