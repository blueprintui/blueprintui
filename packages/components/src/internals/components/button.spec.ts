import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { BaseButton } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, emulateClick, onceEvent } from '@blueprintui/test';

@customElement('base-button-test')
class BaseButtonTest extends BaseButton {}

describe('base button element', () => {
  let fixture: HTMLElement;
  let element: BaseButtonTest;

  beforeEach(async () => {
    fixture = await createFixture(html`<base-button-test>test</base-button-test>`);
    element = fixture.querySelector<BaseButtonTest>('base-button-test');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('test');
  });
});

describe('command behavior', () => {
  let button: BaseButtonTest;
  let popover: HTMLElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <base-button-test commandfor="popover" command="toggle-popover"></base-button-test>
      <div popover="auto" id="popover"></div>
    `);
    button = fixture.querySelector<BaseButtonTest>('base-button-test');
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
