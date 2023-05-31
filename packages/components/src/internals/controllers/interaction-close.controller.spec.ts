import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { interactionClose, InteractionCloseController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';

@interactionClose<InteractionCloseControllerTestElement>()
@customElement('interaction-close-controller-test-element')
class InteractionCloseControllerTestElement extends LitElement {
  @property({ type: Boolean }) closable = false;

  declare interactionCloseController: InteractionCloseController<this>;

  close() {
    this.interactionCloseController.close();
  }
}

describe('interaction-close.controller', () => {
  let element: InteractionCloseControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<interaction-close-controller-test-element></interaction-close-controller-test-element>`
    );
    element = fixture.querySelectorAll<InteractionCloseControllerTestElement>(
      'interaction-close-controller-test-element'
    )[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create interaction-close controller instance', async () => {
    await elementIsStable(element);
    expect(element.interactionCloseController).toBeDefined();
  });

  it('should emit close event when closable', async () => {
    element.closable = true;
    await elementIsStable(element);
    const event = onceEvent(element, 'close');
    element.close();

    await event;
    expect(event).toBeTruthy();
  });
});
