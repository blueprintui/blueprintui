import { html } from 'lit';
import { PopoverMixin } from './popover.mixin.js';
import { createFixture, removeFixture } from '@blueprintui/test';

class TestPopover extends PopoverMixin(HTMLElement) {}
customElements.define('test-popover', TestPopover);

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
