import { html } from 'lit';
import { PopoverMixin } from './popover.mixin.js';
import { createFixture, removeFixture } from '@blueprintui/test';

class TestPopover extends PopoverMixin(HTMLElement) {}
customElements.define('test-popover', TestPopover);

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

  it('should show popover immediately when no interestDelayStart is set', async () => {
    const showSpy = spyOn(element, 'showPopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayStart: undefined } as any);

    const interestEvent = new Event('interest') as any;
    interestEvent.source = trigger;

    element.dispatchEvent(interestEvent);

    expect(showSpy).toHaveBeenCalledWith({ source: trigger });
  });

  it('should show popover immediately when interestDelayStart is empty string', async () => {
    const showSpy = spyOn(element, 'showPopover').and.callFake(() => {});
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayStart: '' } as any);

    const interestEvent = new Event('interest') as any;
    interestEvent.source = trigger;

    element.dispatchEvent(interestEvent);

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
    spyOn(window, 'getComputedStyle').and.returnValue({ interestDelayStart: '500ms' } as any);

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

    const loseInterestEvent = new Event('loseinterest') as any;
    loseInterestEvent.source = trigger;

    element.dispatchEvent(loseInterestEvent);

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
});
