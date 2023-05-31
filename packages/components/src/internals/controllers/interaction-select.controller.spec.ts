import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { interactionSelect, InteractionSelectController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

@interactionSelect<InteractionSelectControllerTestElement>()
@customElement('interaction-select-controller-test-element')
class InteractionSelectControllerTestElement extends LitElement {
  @property({ type: Boolean }) selected = false;

  @property({ type: String }) interaction?: 'auto' | ('single' | 'multi');

  declare interactionSelectController: InteractionSelectController<this>;

  select() {
    this.interactionSelectController.select();
  }
}

describe('interaction-select.controller', () => {
  let element: InteractionSelectControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<interaction-select-controller-test-element></interaction-select-controller-test-element>`
    );
    element = fixture.querySelector<InteractionSelectControllerTestElement>(
      'interaction-select-controller-test-element'
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create interaction select controller instance', async () => {
    await elementIsStable(element);
    expect(element.interactionSelectController).toBeDefined();
  });

  it('should not set selected property by default', async () => {
    expect(element.selected).toBe(false);

    element.select();
    await elementIsStable(element);

    expect(element.selected).toBe(false);
  });

  it('should set selected property if stateful interaction is enabled', async () => {
    expect(element.selected).toBe(false);

    element.interaction = 'single';
    element.select();
    await elementIsStable(element);

    expect(element.selected).toBe(true);
  });
});
