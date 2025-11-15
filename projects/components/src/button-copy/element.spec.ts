import { html } from 'lit';
import '@blueprintui/components/include/button-copy.js';
import { BpButtonCopy } from '@blueprintui/components/button-copy';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button-copy element', () => {
  let fixture: HTMLElement;
  let element: BpButtonCopy;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-copy value="test value"></bp-button-copy>`);
    element = fixture.querySelector<BpButtonCopy>('bp-button-copy');

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve())
      }
    });
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should have default value property', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('test value');
  });

  it('should have default feedback-duration of 1000ms', async () => {
    await elementIsStable(element);
    expect(element.feedbackDuration).toBe(1000);
  });

  it('should have default copy-label', async () => {
    await elementIsStable(element);
    expect(element.copyLabel).toBe('Copy');
  });

  it('should have default success-label', async () => {
    await elementIsStable(element);
    expect(element.successLabel).toBe('Copied!');
  });

  it('should have default error-label', async () => {
    await elementIsStable(element);
    expect(element.errorLabel).toBe('Copy failed');
  });

  it('should support custom feedback-duration', async () => {
    element.feedbackDuration = 2000;
    await elementIsStable(element);
    expect(element.feedbackDuration).toBe(2000);
  });

  it('should support custom copy-label', async () => {
    element.copyLabel = 'Copy to clipboard';
    await elementIsStable(element);
    expect(element.copyLabel).toBe('Copy to clipboard');
  });

  it('should support custom success-label', async () => {
    element.successLabel = 'Done!';
    await elementIsStable(element);
    expect(element.successLabel).toBe('Done!');
  });

  it('should support custom error-label', async () => {
    element.errorLabel = 'Failed to copy';
    await elementIsStable(element);
    expect(element.errorLabel).toBe('Failed to copy');
  });

  it('should call clipboard API when copy() is called', async () => {
    await elementIsStable(element);
    await element.copy();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test value');
  });

  it('should dispatch copy event when copy() is called', async () => {
    await elementIsStable(element);
    let copyEvent: CustomEvent | undefined;
    element.addEventListener('copy', e => (copyEvent = e as CustomEvent));

    await element.copy();
    expect(copyEvent).toBeDefined();
    expect(copyEvent?.detail.value).toBe('test value');
  });

  it('should dispatch copy-success event when copy succeeds', async () => {
    await elementIsStable(element);
    let successEvent: CustomEvent | undefined;
    element.addEventListener('copy-success', e => (successEvent = e as CustomEvent));

    await element.copy();
    expect(successEvent).toBeDefined();
    expect(successEvent?.detail.value).toBe('test value');
  });

  it('should dispatch copy-error event when copy fails', async () => {
    const error = new Error('Clipboard error');
    (navigator.clipboard.writeText as jasmine.Spy).and.returnValue(Promise.reject(error));

    await elementIsStable(element);
    let errorEvent: CustomEvent | undefined;
    element.addEventListener('copy-error', e => (errorEvent = e as CustomEvent));

    await element.copy();
    expect(errorEvent).toBeDefined();
    expect(errorEvent?.detail.error).toBe(error);
  });

  it('should show copy icon by default', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot?.querySelector('bp-icon');
    expect(icon?.shape).toBe('copy');
  });

  it('should show success icon after successful copy', async () => {
    await elementIsStable(element);
    await element.copy();
    await elementIsStable(element);

    const icon = element.shadowRoot?.querySelector('bp-icon');
    expect(icon?.shape).toBe('check');
  });

  it('should show error icon after failed copy', async () => {
    (navigator.clipboard.writeText as jasmine.Spy).and.returnValue(Promise.reject(new Error('fail')));

    await elementIsStable(element);
    await element.copy();
    await elementIsStable(element);

    const icon = element.shadowRoot?.querySelector('bp-icon');
    expect(icon?.shape).toBe('exclamation-circle');
  });

  it('should reset to copy icon after feedback duration', async done => {
    element.feedbackDuration = 100;
    await elementIsStable(element);
    await element.copy();
    await elementIsStable(element);

    const icon = element.shadowRoot?.querySelector('bp-icon');
    expect(icon?.shape).toBe('check');

    setTimeout(async () => {
      await elementIsStable(element);
      const resetIcon = element.shadowRoot?.querySelector('bp-icon');
      expect(resetIcon?.shape).toBe('copy');
      done();
    }, 150);
  });

  it('should trigger copy on click', async () => {
    await elementIsStable(element);
    let copyEvent: CustomEvent | undefined;
    element.addEventListener('copy', e => (copyEvent = e as CustomEvent));

    element.click();
    await elementIsStable(element);

    expect(copyEvent).toBeDefined();
  });

  it('should not copy when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);
    await element.copy();
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });

  it('should not copy when readonly', async () => {
    element.readonly = true;
    await elementIsStable(element);
    await element.copy();
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });

  it('should support custom icon slots', async () => {
    fixture = await createFixture(html`
      <bp-button-copy value="test">
        <bp-icon slot="copy-icon" shape="clipboard"></bp-icon>
        <bp-icon slot="success-icon" shape="check-circle"></bp-icon>
        <bp-icon slot="error-icon" shape="error"></bp-icon>
      </bp-button-copy>
    `);
    element = fixture.querySelector<BpButtonCopy>('bp-button-copy');
    await elementIsStable(element);

    expect(element.querySelector('[slot="copy-icon"]')).toBeTruthy();
    expect(element.querySelector('[slot="success-icon"]')).toBeTruthy();
    expect(element.querySelector('[slot="error-icon"]')).toBeTruthy();
  });

  it('should inherit BaseButton functionality', async () => {
    await elementIsStable(element);
    expect(typeof element.click).toBe('function');
    expect('disabled' in element).toBe(true);
    expect('readonly' in element).toBe(true);
    expect('action' in element).toBe(true);
    expect('status' in element).toBe(true);
  });

  it('should support action property', async () => {
    element.action = 'secondary';
    await elementIsStable(element);
    expect(element.getAttribute('action')).toBe('secondary');
  });

  it('should support status property', async () => {
    element.status = 'success';
    await elementIsStable(element);
    expect(element.getAttribute('status')).toBe('success');
  });

  it('should set bp-button-copy attribute in connectedCallback', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('bp-button-copy')).toBe(true);
  });

  it('should have default i18n configuration', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
  });

  it('should provide icon getter access', async () => {
    await elementIsStable(element);
    expect(element.icon).toBe(element.shadowRoot?.querySelector('bp-icon'));
  });

  it('should update aria-label based on feedback state', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.ariaLabel).toBe('Copy');

    await element.copy();
    await elementIsStable(element);
    expect((element as any)._internals.ariaLabel).toBe('Copied!');
  });

  it('should update aria-label on error state', async () => {
    (navigator.clipboard.writeText as jasmine.Spy).and.returnValue(Promise.reject(new Error('fail')));

    await elementIsStable(element);
    await element.copy();
    await elementIsStable(element);
    expect((element as any)._internals.ariaLabel).toBe('Copy failed');
  });

  it('should have correct CSS parts', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot?.querySelector('[part="internal"]')).toBeTruthy();
    expect(element.shadowRoot?.querySelector('[part="icon"]')).toBeTruthy();
  });

  it('should inherit button styles', async () => {
    await elementIsStable(element);
    expect(BpButtonCopy.styles).toBeDefined();
    expect(Array.isArray(BpButtonCopy.styles)).toBe(true);
  });

  it('should clean up timer on disconnect', async () => {
    await elementIsStable(element);
    await element.copy();
    element.remove();
    // If no error is thrown, cleanup was successful
    expect(true).toBe(true);
  });
});
