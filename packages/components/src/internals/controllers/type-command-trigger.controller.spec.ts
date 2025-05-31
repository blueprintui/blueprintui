import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typeCommandTrigger } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';

@typeCommandTrigger<TypeCommandTriggerControllerTestElement>()
@customElement('type-command-trigger-controller-test-element')
class TypeCommandTriggerControllerTestElement extends LitElement {
  @property({ type: Boolean }) accessor readonly: boolean;
  @property({ type: Boolean }) accessor disabled: boolean;
  @property({ type: String }) accessor command: string;
  @property({ type: String }) accessor commandFor: string;
}

describe('command behavior', () => {
  let button: TypeCommandTriggerControllerTestElement;
  let popover: HTMLElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <type-command-trigger-controller-test-element
        commandfor="popover"
        command="toggle-popover"></type-command-trigger-controller-test-element>
      <div popover="auto" id="popover"></div>
    `);
    button = fixture.querySelector<TypeCommandTriggerControllerTestElement>(
      'type-command-trigger-controller-test-element'
    );
    popover = fixture.querySelector<HTMLElement>('#popover');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize commandFor and command', async () => {
    await elementIsStable(button);
    expect(button.commandFor).toBe('popover');
    expect(button.command).toBe('toggle-popover');
  });

  it('should trigger a command when clicked', async () => {
    await elementIsStable(button);
    const event = onceEvent(popover, 'command');
    emulateClick(button);
    expect((await event).source).toBe(button);
    expect((await event).command).toBe('toggle-popover');
  });
});
