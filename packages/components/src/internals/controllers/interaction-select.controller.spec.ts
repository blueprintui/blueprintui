import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { interactionSelect, InteractionSelectController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

@interactionSelect<InteractionSelectControllerTestElement>()
@customElement('interaction-select-controller-test-element')
class InteractionSelectControllerTestElement extends LitElement {
  @property({ type: Boolean }) accessor selected = false;

  @property({ type: String }) accessor interaction: 'auto' | ('single' | 'multi');

  declare interactionSelectController: InteractionSelectController<this>;

  select() {
    this.interactionSelectController.select();
  }

  deselect() {
    this.interactionSelectController.deselect();
  }

  toggle() {
    this.interactionSelectController.toggle();
  }
}

describe('interaction-select.controller', () => {
  let element: InteractionSelectControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <interaction-select-controller-test-element id="select-controller"></interaction-select-controller-test-element>
      <button commmandfor="select-controller" command="--select">select</button>
      <button commmandfor="select-controller" command="--deselect">deselect</button>
      <button commmandfor="select-controller" command="--toggle">toggle</button>
    `);
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

  it('should select the element if a --select command is triggered', async () => {
    expect(element.selected).toBe(false);

    const commandEvent = new Event('command') as any;
    commandEvent.command = '--select';
    element.dispatchEvent(commandEvent);
    await elementIsStable(element);

    expect(element.selected).toBe(true);
  });

  it('should select the element if a --deselect command is triggered', async () => {
    element.selected = true;
    expect(element.selected).toBe(true);

    const commandEvent = new Event('command') as any;
    commandEvent.command = '--deselect';
    element.dispatchEvent(commandEvent);
    await elementIsStable(element);

    expect(element.selected).toBe(false);
  });

  it('should toggle the element if a --toggle command is triggered', async () => {
    expect(element.selected).toBe(false);

    const commandEvent = new Event('command') as any;
    commandEvent.command = '--toggle';
    element.dispatchEvent(commandEvent);
    await elementIsStable(element);

    expect(element.selected).toBe(true);
  });
});
