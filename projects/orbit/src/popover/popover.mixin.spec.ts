import { html } from 'lit';
import { PopoverMixin } from './popover.mixin.js';
import { createFixture, removeFixture } from '@blueprintui/test';

class TestPopover extends PopoverMixin(HTMLElement) {}
customElements.define('test-popover', TestPopover);

class TestModalPopover extends PopoverMixin(HTMLElement) {
  get popoverConfig() {
    return { type: 'manual' as const, modal: true, focusTrap: true, scrollLock: true };
  }
}
customElements.define('test-modal-popover', TestModalPopover);

class TestHintPopover extends PopoverMixin(HTMLElement) {
  get popoverConfig() {
    return { type: 'hint' as const, modal: false, focusTrap: false, scrollLock: false };
  }
}
customElements.define('test-hint-popover', TestHintPopover);

class TestTrigger extends HTMLElement {}
customElements.define('test-trigger', TestTrigger);

describe('PopoverMixin', () => {
  let fixture: HTMLElement;
  let element: TestPopover;

  beforeEach(async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    element = fixture.querySelector('test-popover') as TestPopover;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create popover element', async () => {
    expect(element).toBeTruthy();
    expect(element._internals).toBeTruthy();
  });

  it('should set open property', async () => {
    element.open = true;
    expect(element.open).toBe(true);
    expect(element.hasAttribute('open')).toBe(true);
  });

  it('should have default popover config', async () => {
    expect(element.popoverConfig.type).toBe('auto');
    expect(element.popoverConfig.modal).toBe(false);
    expect(element.popoverConfig.focusTrap).toBe(false);
    expect(element.popoverConfig.scrollLock).toBe(false);
  });

  it('should set anchor property', async () => {
    element.anchor = 'trigger';
    expect(element.anchor).toBe('trigger');
  });
});

describe('PopoverMixin interestDelayStart', () => {
  let fixture: HTMLElement;
  let element: TestPopover;
  let trigger: TestTrigger;

  beforeEach(async () => {
    jasmine.clock().install();
    fixture = await createFixture(html`
      <test-trigger id="trigger"></test-trigger>
      <test-popover></test-popover>
    `);
    element = fixture.querySelector('test-popover') as TestPopover;
    trigger = fixture.querySelector('test-trigger') as TestTrigger;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    removeFixture(fixture);
  });

  it('should use default 100ms delay when no interestDelayStart is set', async () => {
    const showSpy = spyOn(element, 'showPopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayStart: undefined } as any);

    const interestEvent = new Event('interest') as any;
    interestEvent.source = trigger;

    element.dispatchEvent(interestEvent);

    expect(showSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(100);
    expect(showSpy).toHaveBeenCalledWith({ source: trigger });
  });

  it('should use default 100ms delay when interestDelayStart is empty string', async () => {
    const showSpy = spyOn(element, 'showPopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayStart: '' } as any);

    const interestEvent = new Event('interest') as any;
    interestEvent.source = trigger;

    element.dispatchEvent(interestEvent);

    expect(showSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(100);
    expect(showSpy).toHaveBeenCalledWith({ source: trigger });
  });

  it('should delay showing popover when interestDelayStart is set in milliseconds', async () => {
    const showSpy = spyOn(element, 'showPopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayStart: '500ms' } as any);

    const interestEvent = new Event('interest') as any;
    interestEvent.source = trigger;

    element.dispatchEvent(interestEvent);

    expect(showSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(499);
    expect(showSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(1);
    expect(showSpy).toHaveBeenCalledWith({ source: trigger });
  });

  it('should delay showing popover when interestDelayStart is set in seconds', async () => {
    const showSpy = spyOn(element, 'showPopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayStart: '1s' } as any);

    const interestEvent = new Event('interest') as any;
    interestEvent.source = trigger;

    element.dispatchEvent(interestEvent);

    expect(showSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(999);
    expect(showSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(1);
    expect(showSpy).toHaveBeenCalledWith({ source: trigger });
  });

  it('should clear timeout on loseinterest event before popover shows', async () => {
    const showSpy = spyOn(element, 'showPopover').and.callFake(() => {});
    spyOn(element, 'hidePopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({
      interestDelayStart: '500ms',
      interestDelayEnd: '100ms'
    } as any);

    const interestEvent = new Event('interest') as any;
    interestEvent.source = trigger;
    element.dispatchEvent(interestEvent);

    jasmine.clock().tick(250);
    expect(showSpy).not.toHaveBeenCalled();

    const loseInterestEvent = new Event('loseinterest') as any;
    loseInterestEvent.source = trigger;
    element.dispatchEvent(loseInterestEvent);

    jasmine.clock().tick(500);
    expect(showSpy).not.toHaveBeenCalled();
  });

  it('should hide popover on loseinterest event from custom element', async () => {
    const hideSpy = spyOn(element, 'hidePopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayEnd: 'normal' } as any);

    const loseInterestEvent = new Event('loseinterest') as any;
    loseInterestEvent.source = trigger;

    element.dispatchEvent(loseInterestEvent);

    jasmine.clock().tick(100);
    expect(hideSpy).toHaveBeenCalled();
  });

  it('should not show popover on interest event from non-custom element', async () => {
    const showSpy = spyOn(element, 'showPopover');
    const nonCustomElement = document.createElement('div');

    const interestEvent = new Event('interest') as any;
    interestEvent.source = nonCustomElement;

    element.dispatchEvent(interestEvent);

    expect(showSpy).not.toHaveBeenCalled();
  });

  it('should not hide popover on loseinterest event from non-custom element', async () => {
    const hideSpy = spyOn(element, 'hidePopover');
    const nonCustomElement = document.createElement('div');

    const loseInterestEvent = new Event('loseinterest') as any;
    loseInterestEvent.source = nonCustomElement;

    element.dispatchEvent(loseInterestEvent);

    expect(hideSpy).not.toHaveBeenCalled();
  });

  it('should delay hiding popover when interestDelayEnd is set in milliseconds', async () => {
    const hideSpy = spyOn(element, 'hidePopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayEnd: '300ms' } as any);

    const loseInterestEvent = new Event('loseinterest') as any;
    loseInterestEvent.source = trigger;

    element.dispatchEvent(loseInterestEvent);

    expect(hideSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(299);
    expect(hideSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(1);
    expect(hideSpy).toHaveBeenCalled();
  });

  it('should delay hiding popover when interestDelayEnd is set in seconds', async () => {
    const hideSpy = spyOn(element, 'hidePopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayEnd: '2s' } as any);

    const loseInterestEvent = new Event('loseinterest') as any;
    loseInterestEvent.source = trigger;

    element.dispatchEvent(loseInterestEvent);

    expect(hideSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(1999);
    expect(hideSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(1);
    expect(hideSpy).toHaveBeenCalled();
  });

  it('should use default 100ms delay when interestDelayStart is normal', async () => {
    const showSpy = spyOn(element, 'showPopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayStart: 'normal' } as any);

    const interestEvent = new Event('interest') as any;
    interestEvent.source = trigger;

    element.dispatchEvent(interestEvent);

    expect(showSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(99);
    expect(showSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(1);
    expect(showSpy).toHaveBeenCalledWith({ source: trigger });
  });

  it('should use default 100ms delay when interestDelayEnd is normal', async () => {
    const hideSpy = spyOn(element, 'hidePopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayEnd: 'normal' } as any);

    const loseInterestEvent = new Event('loseinterest') as any;
    loseInterestEvent.source = trigger;

    element.dispatchEvent(loseInterestEvent);

    expect(hideSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(99);
    expect(hideSpy).not.toHaveBeenCalled();

    jasmine.clock().tick(1);
    expect(hideSpy).toHaveBeenCalled();
  });
});

describe('PopoverMixin open property', () => {
  let fixture: HTMLElement;
  let element: TestPopover;

  beforeEach(async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    element = fixture.querySelector('test-popover') as TestPopover;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should remove open attribute when set to false', async () => {
    element.open = true;
    expect(element.hasAttribute('open')).toBe(true);

    element.open = false;
    expect(element.open).toBe(false);
    expect(element.hasAttribute('open')).toBe(false);
  });

  it('should call requestUpdate when open changes if available', async () => {
    (element as any).requestUpdate = jasmine.createSpy('requestUpdate');
    element.open = true;
    expect((element as any).requestUpdate).toHaveBeenCalledWith('open');

    element.open = false;
    expect((element as any).requestUpdate).toHaveBeenCalledWith('open');
  });

  it('should not throw when requestUpdate is not available', async () => {
    expect(() => {
      element.open = true;
    }).not.toThrow();
  });
});

describe('PopoverMixin connectedCallback', () => {
  let fixture: HTMLElement;
  let element: TestPopover;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should set inert to true when not initially open', async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    element = fixture.querySelector('test-popover') as TestPopover;
    expect(element.inert).toBe(true);
  });

  it('should set popover attribute to configured type', async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    element = fixture.querySelector('test-popover') as TestPopover;
    expect(element.popover).toBe('auto');
  });

  it('should create shadow root with adopted stylesheets', async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    element = fixture.querySelector('test-popover') as TestPopover;
    expect(element.shadowRoot).toBeTruthy();
    expect(element.shadowRoot.adoptedStyleSheets.length).toBeGreaterThan(0);
  });

  it('should add popover-ready state after animation frame', async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    element = fixture.querySelector('test-popover') as TestPopover;
    await new Promise(r => requestAnimationFrame(() => r('')));
    expect(element.matches(':state(popover-ready)')).toBe(true);
  });

  it('should sync open from attribute on connect', async () => {
    fixture = await createFixture(html`<test-popover open></test-popover>`);
    element = fixture.querySelector('test-popover') as TestPopover;
    expect(element.open).toBe(true);
  });
});

describe('PopoverMixin custom config', () => {
  let fixture: HTMLElement;

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should set popover type to manual from config', async () => {
    fixture = await createFixture(html`<test-modal-popover></test-modal-popover>`);
    const element = fixture.querySelector('test-modal-popover') as TestModalPopover;
    expect(element.popover).toBe('manual');
  });

  it('should set popover type to hint from config', async () => {
    fixture = await createFixture(html`<test-hint-popover></test-hint-popover>`);
    const element = fixture.querySelector('test-hint-popover') as TestHintPopover;
    expect(element.popover).toBe('hint');
  });

  it('should set ariaModal true for modal config', async () => {
    fixture = await createFixture(html`<test-modal-popover></test-modal-popover>`);
    const element = fixture.querySelector('test-modal-popover') as TestModalPopover;
    expect(element._internals.ariaModal).toBe('true');
  });

  it('should add modal CSS state for modal config', async () => {
    fixture = await createFixture(html`<test-modal-popover></test-modal-popover>`);
    const element = fixture.querySelector('test-modal-popover') as TestModalPopover;
    expect(element.matches(':state(modal)')).toBe(true);
  });

  it('should set ariaModal false for non-modal config', async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    const element = fixture.querySelector('test-popover') as TestPopover;
    expect(element._internals.ariaModal).toBe('false');
  });

  it('should not have modal CSS state for non-modal config', async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    const element = fixture.querySelector('test-popover') as TestPopover;
    expect(element.matches(':state(modal)')).toBe(false);
  });
});

describe('PopoverMixin beforetoggle event', () => {
  let fixture: HTMLElement;
  let element: TestPopover;

  beforeEach(async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    element = fixture.querySelector('test-popover') as TestPopover;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should dispatch custom open event on beforetoggle with open state', async () => {
    const openSpy = jasmine.createSpy('open');
    element.addEventListener('open', openSpy);

    const toggleEvent = new ToggleEvent('beforetoggle', { newState: 'open', oldState: 'closed' });
    element.dispatchEvent(toggleEvent);

    expect(openSpy).toHaveBeenCalled();
  });

  it('should dispatch custom close event on beforetoggle with closed state', async () => {
    const closeSpy = jasmine.createSpy('close');
    element.addEventListener('close', closeSpy);

    const toggleEvent = new ToggleEvent('beforetoggle', { newState: 'closed', oldState: 'open' });
    element.dispatchEvent(toggleEvent);

    expect(closeSpy).toHaveBeenCalled();
  });
});

describe('PopoverMixin toggle event', () => {
  let fixture: HTMLElement;
  let element: TestPopover;

  beforeEach(async () => {
    fixture = await createFixture(html`<test-popover></test-popover>`);
    element = fixture.querySelector('test-popover') as TestPopover;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should set inert to false when toggled open', async () => {
    const toggleEvent = new ToggleEvent('toggle', { newState: 'open', oldState: 'closed' });
    element.dispatchEvent(toggleEvent);
    expect(element.inert).toBe(false);
  });

  it('should set inert to true when toggled closed', async () => {
    const toggleEvent = new ToggleEvent('toggle', { newState: 'closed', oldState: 'open' });
    element.dispatchEvent(toggleEvent);
    expect(element.inert).toBe(true);
  });
});

describe('PopoverMixin scroll lock', () => {
  let fixture: HTMLElement;
  let element: TestModalPopover;

  beforeEach(async () => {
    fixture = await createFixture(html`<test-modal-popover></test-modal-popover>`);
    element = fixture.querySelector('test-modal-popover') as TestModalPopover;
  });

  afterEach(() => {
    document.body.style.overflow = '';
    removeFixture(fixture);
  });

  it('should enable scroll lock on toggle open when scrollLock is true', async () => {
    const toggleEvent = new ToggleEvent('toggle', { newState: 'open', oldState: 'closed' });
    element.dispatchEvent(toggleEvent);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should disable scroll lock on toggle closed when scrollLock is true', async () => {
    document.body.style.overflow = 'hidden';
    const toggleEvent = new ToggleEvent('toggle', { newState: 'closed', oldState: 'open' });
    element.dispatchEvent(toggleEvent);
    expect(document.body.style.overflow).toBe('');
  });

  it('should not enable scroll lock when scrollLock is false', async () => {
    removeFixture(fixture);
    fixture = await createFixture(html`<test-popover></test-popover>`);
    const popover = fixture.querySelector('test-popover') as TestPopover;
    const toggleEvent = new ToggleEvent('toggle', { newState: 'open', oldState: 'closed' });
    popover.dispatchEvent(toggleEvent);
    expect(document.body.style.overflow).not.toBe('hidden');
  });
});

describe('PopoverMixin command event', () => {
  let fixture: HTMLElement;
  let element: TestPopover;
  let trigger: TestTrigger;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <test-trigger id="trigger"></test-trigger>
      <test-popover></test-popover>
    `);
    element = fixture.querySelector('test-popover') as TestPopover;
    trigger = fixture.querySelector('test-trigger') as TestTrigger;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should call togglePopover on toggle-popover command from custom element', async () => {
    const toggleSpy = spyOn(element, 'togglePopover').and.callFake(() => true);

    const commandEvent = new Event('command') as any;
    commandEvent.source = trigger;
    commandEvent.command = 'toggle-popover';

    element.dispatchEvent(commandEvent);

    expect(toggleSpy).toHaveBeenCalledWith({ source: trigger });
  });

  it('should call showPopover on show-popover command from custom element', async () => {
    const showSpy = spyOn(element, 'showPopover').and.callFake(() => {});

    const commandEvent = new Event('command') as any;
    commandEvent.source = trigger;
    commandEvent.command = 'show-popover';

    element.dispatchEvent(commandEvent);

    expect(showSpy).toHaveBeenCalledWith({ source: trigger });
  });

  it('should call hidePopover on hide-popover command from custom element', async () => {
    const hideSpy = spyOn(element, 'hidePopover').and.callFake(() => {});

    const commandEvent = new Event('command') as any;
    commandEvent.source = trigger;
    commandEvent.command = 'hide-popover';

    element.dispatchEvent(commandEvent);

    expect(hideSpy).toHaveBeenCalled();
  });

  it('should not call togglePopover on command from non-custom element', async () => {
    const toggleSpy = spyOn(element, 'togglePopover');
    const nonCustomElement = document.createElement('div');

    const commandEvent = new Event('command') as any;
    commandEvent.source = nonCustomElement;
    commandEvent.command = 'toggle-popover';

    element.dispatchEvent(commandEvent);

    expect(toggleSpy).not.toHaveBeenCalled();
  });

  it('should not call showPopover on command from non-custom element', async () => {
    const showSpy = spyOn(element, 'showPopover');
    const nonCustomElement = document.createElement('div');

    const commandEvent = new Event('command') as any;
    commandEvent.source = nonCustomElement;
    commandEvent.command = 'show-popover';

    element.dispatchEvent(commandEvent);

    expect(showSpy).not.toHaveBeenCalled();
  });
});
