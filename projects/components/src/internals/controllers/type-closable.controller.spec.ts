import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typeClosable, TypeClosableController } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';

@typeClosable<TypeClosableControllerTestElement>()
@customElement('type-closable-controller-test-element')
class TypeClosableControllerTestElement extends LitElement {
  @property({ type: Boolean }) accessor closable = false;

  @property({ type: Boolean, reflect: true }) accessor hidden = false; // eslint-disable-line rules/no-reserved-property-names

  _internals: ElementInternals;

  declare typeClosableController: TypeClosableController<this>;

  async toggle() {
    await this.typeClosableController.toggle();
  }

  async close() {
    await this.typeClosableController.close();
  }

  async open() {
    await this.typeClosableController.open();
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

  it('should create type closable controller instance', async () => {
    await elementIsStable(element);
    expect(element.typeClosableController).toBeDefined();
  });

  it('should emit close event', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'close');
    element.close();

    await event;
    expect(event).toBeTruthy();
  });

  it('should emit open event', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'open');
    element.open();

    await event;
    expect(event).toBeTruthy();
  });

  it('should toggle event', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'close');
    element.toggle();

    await event;
    expect(event).toBeTruthy();
  });

  describe('command events', () => {
    it('should respond to --toggle command', async () => {
      await elementIsStable(element);
      element.hidden = true;
      await elementIsStable(element);

      const openEvent = onceEvent(element, 'open');
      const commandEvent = new Event('command') as any;
      commandEvent.command = '--toggle';
      element.dispatchEvent(commandEvent);

      await openEvent;
      expect(openEvent).toBeTruthy();
    });

    it('should respond to --close command', async () => {
      await elementIsStable(element);
      element.hidden = false;
      await elementIsStable(element);

      const closeEvent = onceEvent(element, 'close');
      const commandEvent = new Event('command') as any;
      commandEvent.command = '--close';
      element.dispatchEvent(commandEvent);

      await closeEvent;
      expect(closeEvent).toBeTruthy();
    });

    it('should respond to --open command', async () => {
      await elementIsStable(element);
      element.hidden = true;
      await elementIsStable(element);

      const openEvent = onceEvent(element, 'open');
      const commandEvent = new Event('command') as any;
      commandEvent.command = '--open';
      element.dispatchEvent(commandEvent);

      await openEvent;
      expect(openEvent).toBeTruthy();
    });
  });

  describe('CSS states', () => {
    it('should add close state when hidden', async () => {
      await elementIsStable(element);
      element.hidden = true;
      await elementIsStable(element);

      expect(element._internals.states.has('close')).toBe(true);
      expect(element._internals.states.has('open')).toBe(false);
      expect(element._internals.ariaHidden).toBe('true');
    });

    it('should add open state when not hidden', async () => {
      await elementIsStable(element);
      element.hidden = false;
      await elementIsStable(element);

      expect(element._internals.states.has('open')).toBe(true);
      expect(element._internals.states.has('close')).toBe(false);
      expect(element._internals.ariaHidden).toBe('false');
    });

    it('should toggle states when hidden changes', async () => {
      await elementIsStable(element);

      element.hidden = true;
      await elementIsStable(element);
      expect(element._internals.states.has('close')).toBe(true);
      expect(element._internals.states.has('open')).toBe(false);

      element.hidden = false;
      await elementIsStable(element);
      expect(element._internals.states.has('open')).toBe(true);
      expect(element._internals.states.has('close')).toBe(false);
    });
  });

  describe('command trigger behavior', () => {
    let elementWithTrigger: TypeClosableControllerTestElement;
    let fixtureWithTrigger: HTMLElement;

    beforeEach(async () => {
      fixtureWithTrigger = await createFixture(html`
        <button commandfor="closable-element" command="--toggle">Toggle</button>
        <type-closable-controller-test-element id="closable-element"></type-closable-controller-test-element>
      `);
      elementWithTrigger = fixtureWithTrigger.querySelector<TypeClosableControllerTestElement>(
        'type-closable-controller-test-element'
      );
      await elementIsStable(elementWithTrigger);
    });

    afterEach(() => {
      removeFixture(fixtureWithTrigger);
    });

    it('should modify hidden property when command trigger is present', async () => {
      expect(elementWithTrigger.hidden).toBe(false);

      await elementWithTrigger.close();
      await elementIsStable(elementWithTrigger);
      expect(elementWithTrigger.hidden).toBe(true);

      await elementWithTrigger.open();
      await elementIsStable(elementWithTrigger);
      expect(elementWithTrigger.hidden).toBe(false);
    });

    it('should toggle hidden property with toggle method when trigger is present', async () => {
      expect(elementWithTrigger.hidden).toBe(false);

      await elementWithTrigger.toggle();
      await elementIsStable(elementWithTrigger);
      expect(elementWithTrigger.hidden).toBe(true);

      await elementWithTrigger.toggle();
      await elementIsStable(elementWithTrigger);
      expect(elementWithTrigger.hidden).toBe(false);
    });

    it('should not modify hidden property when no command trigger is present', async () => {
      await elementIsStable(element);
      expect(element.hidden).toBe(false);

      await element.close();
      await elementIsStable(element);
      expect(element.hidden).toBe(false);

      await element.open();
      await elementIsStable(element);
      expect(element.hidden).toBe(false);
    });

    // it('should allow preventing default on close event', async () => {
    //   elementWithTrigger.hidden = false;
    //   await elementIsStable(elementWithTrigger);

    //   const close = onceEvent(elementWithTrigger, 'close');
    //   globalThis.document.addEventListener('close', (e: Event) => e.preventDefault());
    //   await elementWithTrigger.close();
    //   await close;
    //   await elementIsStable(elementWithTrigger);
    //   expect(elementWithTrigger.hidden).toBe(false);
    // });

    // it('should allow preventing default on open event', async () => {
    //   elementWithTrigger.hidden = true;
    //   await elementIsStable(elementWithTrigger);

    //   elementWithTrigger.addEventListener('open', (e: Event) => e.preventDefault());
    //   await elementWithTrigger.open();
    //   await elementIsStable(elementWithTrigger);
    //   expect(elementWithTrigger.hidden).toBe(true);
    // });
  });
});
