import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { interactionOpen, InteractionOpenController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';

@interactionOpen<InteractionOpenControllerTestElement>()
@customElement('interaction-open-controller-test-element')
class InteractionOpenControllerTestElement extends LitElement {
  @property({ type: Boolean }) closable = false;

  declare interactionOpenController: InteractionOpenController<this>;

  open() {
    this.interactionOpenController.open();
  }
}

describe('interaction-open.controller', () => {
  let element: InteractionOpenControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<interaction-open-controller-test-element></interaction-open-controller-test-element>`
    );
    element = fixture.querySelectorAll<InteractionOpenControllerTestElement>(
      'interaction-open-controller-test-element'
    )[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create interaction open controller instance', async () => {
    await elementIsStable(element);
    expect(element.interactionOpenController).toBeDefined();
  });

  it('should emit open event', async () => {
    element.closable = true;
    await elementIsStable(element);
    const event = onceEvent(element, 'open');
    element.open();

    await event;
    expect(event).toBeTruthy();
  });
});
