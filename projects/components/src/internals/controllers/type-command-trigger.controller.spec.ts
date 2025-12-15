import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';
import { BaseButton } from '../components/button.js';

@customElement('type-command-trigger-controller-test-element')
class TypeCommandTriggerControllerTestElement extends BaseButton {}

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

  it('should initialize commandForElement and command', async () => {
    await elementIsStable(button);
    expect(button.commandForElement).toBe(popover);
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
