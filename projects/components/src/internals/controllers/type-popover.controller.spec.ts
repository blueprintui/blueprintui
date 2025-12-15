import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { attachInternals, typePopover, TypePopoverController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';
import '@blueprintui/components/include/button.js';

@typePopover<TypePopoverControllerTestElement>(host => ({
  anchor: host.anchor,
  closeOnScroll: host.closeOnScroll,
  type: host.type
}))
@customElement('type-popover-controller-test-element')
class TypePopoverControllerTestElement extends LitElement {
  @property({ type: String }) accessor type: 'auto' | 'manual' | 'hint' = 'auto';

  @property({ type: Boolean }) accessor focusTrap = false;

  @property({ type: Boolean }) accessor closeOnScroll = true;

  @property({ type: String }) accessor anchor: string | HTMLElement;

  declare typePopoverController: TypePopoverController<this>;

  _internals!: ElementInternals;

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
  }
}

describe('auto popover', () => {
  let element: TypePopoverControllerTestElement;
  let button: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button popovertarget="test-popover">trigger</button>
      <type-popover-controller-test-element id="test-popover"></type-popover-controller-test-element>
    `);
    element = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
    button = fixture.querySelector<HTMLButtonElement>('button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should dispatch a "toggle" event when toggled', async () => {
    await elementIsStable(element);

    const event = onceEvent(element, 'toggle');
    element.showPopover();
    expect(await event).toBeTruthy();
  });

  it('should set popover open state when opened', async () => {
    element.showPopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);
  });

  it('should remove popover open state when closed', async () => {
    element.showPopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);

    element.hidePopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(false);
  });

  it('should close element if scroll event fires', async () => {
    element.showPopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);

    const event = onceEvent(element, 'toggle');
    document.dispatchEvent(new Event('scroll'));
    expect(await event).toBeTruthy();
    expect(element.matches(':popover-open')).toBe(false);
  });

  it('should assign anchor and positionAnchor css variables', async () => {
    const event = onceEvent(element, 'toggle');
    emulateClick(button);
    expect(await event).toBeTruthy();
    await elementIsStable(element);
    expect(element.style.positionAnchor.includes('--')).toBe(true);
    expect(button.style.anchorName.includes('--')).toBe(true);
    expect(button.style.anchorName).toBe(element.style.positionAnchor);
  });
});

describe('hint popover', () => {
  let element: TypePopoverControllerTestElement;
  let source: HTMLElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-button interestfor="hint-test">trigger</bp-button>
      <type-popover-controller-test-element id="hint-test" type="hint"></type-popover-controller-test-element>
    `);
    element = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
    source = fixture.querySelector<HTMLElement>('bp-button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should trigger toggle on interest event', async () => {
    const toggleEvent = onceEvent(element, 'interest');
    const interestEvent = new Event('interest', { cancelable: true }) as any;
    interestEvent.source = source;
    element.dispatchEvent(interestEvent);
    await toggleEvent;
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);
  });

  it('should trigger toggle close event on loseinterest event', async () => {
    element.showPopover();
    const toggleEvent = onceEvent(element, 'loseinterest');
    const loseInterestEvent = new Event('loseinterest', { cancelable: true }) as any;
    loseInterestEvent.source = source;
    element.dispatchEvent(loseInterestEvent);
    await toggleEvent;
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(false);
  });
});

describe('explicit anchor', () => {
  let popover1: TypePopoverControllerTestElement;
  let button2: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button id="btn-1" popovertarget="popover-1">trigger</button>
      <button id="btn-2">anchor</button>
      <type-popover-controller-test-element id="popover-1" anchor="btn-2"></type-popover-controller-test-element>
    `);
    popover1 = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
    button2 = fixture.querySelector<HTMLButtonElement>('#btn-2');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should set popover open state when opened', async () => {
    popover1.showPopover();
    await elementIsStable(popover1);
    expect(popover1.matches(':popover-open')).toBe(true);
    expect(popover1.anchor).toBe('btn-2');
    expect(popover1.style.positionAnchor.includes('--')).toBe(true);
    expect(button2.style.anchorName.includes('--')).toBe(true);
    expect(button2.style.anchorName).toBe(popover1.style.positionAnchor);
  });
});

describe('command behavior', () => {
  let element: TypePopoverControllerTestElement;
  let button: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <button commandfor="test-popover" command="toggle-popover">trigger</button>
      <type-popover-controller-test-element id="test-popover"></type-popover-controller-test-element>
    `);
    element = fixture.querySelectorAll<TypePopoverControllerTestElement>('type-popover-controller-test-element')[0];
    button = fixture.querySelector<HTMLButtonElement>('button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should listen for invoker commands', async () => {
    expect(element.matches(':popover-open')).toBe(false);

    const commandEvent = onceEvent(element, 'command');
    const toggleEvent = onceEvent(element, 'toggle');
    emulateClick(button);
    const { source, command } = await commandEvent;
    await toggleEvent;
    await elementIsStable(element);
    expect(source).toBe(button);
    expect(command).toBe('toggle-popover');
  });
});

describe('shadow root behavior', () => {
  @customElement('shadow-root-test-host')
  class ShadowRootTestHost extends LitElement {
    render() {
      return html`
        <bp-button commandfor="shadow-popover" command="toggle-popover">trigger</bp-button>
        <type-popover-controller-test-element id="shadow-popover"></type-popover-controller-test-element>
      `;
    }
  }

  let hostElement: ShadowRootTestHost;
  let popover: TypePopoverControllerTestElement;
  let button: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<shadow-root-test-host></shadow-root-test-host>`);
    hostElement = fixture.querySelector<ShadowRootTestHost>('shadow-root-test-host');
    await elementIsStable(hostElement);
    popover = hostElement.shadowRoot.querySelector<TypePopoverControllerTestElement>(
      'type-popover-controller-test-element'
    );
    button = hostElement.shadowRoot.querySelector<HTMLButtonElement>('bp-button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should find triggers within shadow root using commandfor', async () => {
    expect(popover.matches(':popover-open')).toBe(false);
    const commandEvent = new CommandEvent('command', { command: 'toggle-popover', source: button });
    const toggleEvent = onceEvent(popover, 'toggle');
    popover.dispatchEvent(commandEvent);
    await toggleEvent;
    await elementIsStable(popover);
    expect(popover.matches(':popover-open')).toBe(true);
  });

  it('should assign anchor and positionAnchor css variables within shadow root', async () => {
    const event = onceEvent(popover, 'toggle');
    popover.dispatchEvent(new CommandEvent('command', { command: 'toggle-popover', source: button }));
    await event;
    await elementIsStable(popover);
    expect(popover.style.positionAnchor.includes('--')).toBe(true);
    expect(button.style.anchorName.includes('--')).toBe(true);
    expect(button.style.anchorName).toBe(popover.style.positionAnchor);
  });

  it('should close popover within shadow root on scroll', async () => {
    popover.showPopover();
    await elementIsStable(popover);
    expect(popover.matches(':popover-open')).toBe(true);

    const event = onceEvent(popover, 'toggle');
    document.dispatchEvent(new Event('scroll'));
    expect(await event).toBeTruthy();
    expect(popover.matches(':popover-open')).toBe(false);
  });
});

describe('shadow root with popovertarget', () => {
  @customElement('shadow-root-popovertarget-host')
  class ShadowRootPopoverTargetHost extends LitElement {
    render() {
      return html`
        <button popovertarget="shadow-popover-target">trigger</button>
        <type-popover-controller-test-element id="shadow-popover-target"></type-popover-controller-test-element>
      `;
    }
  }

  let hostElement: ShadowRootPopoverTargetHost;
  let popover: TypePopoverControllerTestElement;
  let button: HTMLButtonElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<shadow-root-popovertarget-host></shadow-root-popovertarget-host>`);
    hostElement = fixture.querySelector<ShadowRootPopoverTargetHost>('shadow-root-popovertarget-host');
    await elementIsStable(hostElement);
    popover = hostElement.shadowRoot.querySelector<TypePopoverControllerTestElement>(
      'type-popover-controller-test-element'
    );
    button = hostElement.shadowRoot.querySelector<HTMLButtonElement>('button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should find triggers within shadow root using popovertarget', async () => {
    expect(popover.matches(':popover-open')).toBe(false);

    const toggleEvent = onceEvent(popover, 'toggle');
    popover.showPopover();
    await toggleEvent;
    await elementIsStable(popover);
    expect(popover.matches(':popover-open')).toBe(true);
  });

  it('should assign anchor and positionAnchor css variables for popovertarget in shadow root', async () => {
    const toggleEvent = onceEvent(popover, 'toggle');
    popover.showPopover({ source: button });
    await toggleEvent;
    await elementIsStable(popover);
    expect(popover.style.positionAnchor.includes('--')).toBe(true);
    expect(button.style.anchorName.includes('--')).toBe(true);
    expect(button.style.anchorName).toBe(popover.style.positionAnchor);
  });
});
