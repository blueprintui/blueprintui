import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { interactionExpand, InteractionExpandController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';

@interactionExpand<InteractionExpandControllerTestElement>(() => ({ keynav: 'inline' }))
@customElement('interaction-expand-controller-test-element')
class InteractionExpandControllerTestElement extends LitElement {
  @property({ type: Boolean }) expanded = false;

  declare interactionExpandController: InteractionExpandController<this>;

  open() {
    this.interactionExpandController.open();
  }

  close() {
    this.interactionExpandController.close();
  }
}

describe('interaction-expand.controller', () => {
  let element: InteractionExpandControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<interaction-expand-controller-test-element></interaction-expand-controller-test-element>`
    );
    element = fixture.querySelectorAll<InteractionExpandControllerTestElement>(
      'interaction-expand-controller-test-element'
    )[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create interaction expand controller instance', async () => {
    await elementIsStable(element);
    expect(element.interactionExpandController).toBeDefined();
  });

  it('should emit open event', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'open');
    element.open();

    await event;
    expect(event).toBeTruthy();
  });

  it('should emit close event', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'close');
    element.close();

    await event;
    expect(event).toBeTruthy();
  });

  it('should emit event "open" on "ArrowRight" key', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'open');

    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowRight' }));
    await event;
    expect(event).toBeTruthy();
  });

  it('should emit event "close" on "ArrowLeft" key', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'close');

    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowLeft' }));
    await event;
    expect(event).toBeTruthy();
  });
});
