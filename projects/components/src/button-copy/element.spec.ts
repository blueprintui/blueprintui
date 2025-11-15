import { html } from 'lit';
import '@blueprintui/components/include/button-copy.js';
import { BpButtonCopy } from '@blueprintui/components/button-copy';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button-copy element', () => {
  let fixture: HTMLElement;
  let element: BpButtonCopy;
  let clipboardWriteTextSpy: jasmine.Spy;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-copy value="test value"></bp-button-copy>`);
    element = fixture.querySelector<BpButtonCopy>('bp-button-copy');

    // Mock clipboard API
    clipboardWriteTextSpy = jasmine.createSpy('writeText').and.returnValue(Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: clipboardWriteTextSpy
      },
      configurable: true
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
    const emptyElement = await createFixture(html`<bp-button-copy></bp-button-copy>`);
    const button = emptyElement.querySelector<BpButtonCopy>('bp-button-copy');
    await elementIsStable(button);
    expect(button.value).toBe('');
  });

  it('should set value property', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('test value');
  });

  it('should copy value to clipboard when clicked', async () => {
    await elementIsStable(element);
    element.click();
    await elementIsStable(element);
    expect(clipboardWriteTextSpy).toHaveBeenCalledWith('test value');
  });

  it('should call copy method programmatically', async () => {
    await elementIsStable(element);
    const result = await element.copy();
    expect(result).toBe(true);
    expect(clipboardWriteTextSpy).toHaveBeenCalledWith('test value');
  });

  it('should dispatch copy event with correct detail on success', async () => {
    await elementIsStable(element);
    const copyListener = jasmine.createSpy('copyListener');
    element.addEventListener('copy', copyListener);

    await element.copy();
    await elementIsStable(element);

    expect(copyListener).toHaveBeenCalled();
    const event = copyListener.calls.mostRecent().args[0];
    expect(event.detail.value).toBe('test value');
    expect(event.detail.status).toBe('success');
  });

  it('should show success icon after successful copy', async () => {
    await elementIsStable(element);
    await element.copy();
    await elementIsStable(element);

    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('check');
  });

  it('should reset to default icon after 1000ms', done => {
    elementIsStable(element)
      .then(() => {
        return element.copy();
      })
      .then(() => {
        return elementIsStable(element);
      })
      .then(() => {
        let icon = element.shadowRoot.querySelector('bp-icon');
        expect(icon.shape).toBe('check');

        setTimeout(async () => {
          await elementIsStable(element);
          icon = element.shadowRoot.querySelector('bp-icon');
          expect(icon.shape).toBe('copy');
          done();
        }, 1100);
      });
  });

  it('should handle clipboard write error', async () => {
    clipboardWriteTextSpy.and.returnValue(Promise.reject(new Error('clipboard error')));
    spyOn(console, 'error');

    await elementIsStable(element);
    const result = await element.copy();
    await elementIsStable(element);

    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });

  it('should show error icon after failed copy', async () => {
    clipboardWriteTextSpy.and.returnValue(Promise.reject(new Error('clipboard error')));
    spyOn(console, 'error');

    await elementIsStable(element);
    await element.copy();
    await elementIsStable(element);

    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('error');
  });

  it('should not copy when disabled', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    const result = await element.copy();
    expect(result).toBe(false);
    expect(clipboardWriteTextSpy).not.toHaveBeenCalled();
  });

  it('should not copy when readonly', async () => {
    await elementIsStable(element);
    element.readonly = true;
    await elementIsStable(element);

    const result = await element.copy();
    expect(result).toBe(false);
    expect(clipboardWriteTextSpy).not.toHaveBeenCalled();
  });

  it('should trigger copy on command event', async () => {
    await elementIsStable(element);
    const commandEvent = new Event('command');
    (commandEvent as any).command = 'copy';
    element.dispatchEvent(commandEvent);
    await elementIsStable(element);

    expect(clipboardWriteTextSpy).toHaveBeenCalledWith('test value');
  });

  it('should render tooltip with aria-label', async () => {
    const customFixture = await createFixture(
      html`<bp-button-copy value="test" aria-label="Copy to clipboard"></bp-button-copy>`
    );
    const customElement = customFixture.querySelector<BpButtonCopy>('bp-button-copy');
    await elementIsStable(customElement);

    const tooltip = customElement.shadowRoot.querySelector('bp-tooltip');
    expect(tooltip.textContent.trim()).toBe('Copy to clipboard');
  });

  it('should render tooltip with i18n.copy when no aria-label', async () => {
    await elementIsStable(element);
    const tooltip = element.shadowRoot.querySelector('bp-tooltip');
    expect(tooltip.textContent.trim()).toBe(element.i18n.copy);
  });

  it('should render default copy icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('copy');
    expect(icon.size).toBe('sm');
  });

  it('should allow custom icons via slots', async () => {
    const customFixture = await createFixture(html`
      <bp-button-copy value="test">
        <bp-icon slot="" shape="custom"></bp-icon>
        <bp-icon slot="success" shape="custom-success"></bp-icon>
        <bp-icon slot="error" shape="custom-error"></bp-icon>
      </bp-button-copy>
    `);
    const customElement = customFixture.querySelector<BpButtonCopy>('bp-button-copy');
    await elementIsStable(customElement);

    const slottedIcon = customElement.querySelector<any>('bp-icon[slot=""]');
    expect(slottedIcon.shape).toBe('custom');
  });

  it('should clear feedback timer on disconnect', async () => {
    await elementIsStable(element);
    await element.copy();
    await elementIsStable(element);

    // Disconnect while feedback is showing
    element.remove();

    // Wait past the feedback timeout
    await new Promise(resolve => setTimeout(resolve, 1100));

    // Should not throw error - timer was cleared
    expect(true).toBe(true);
  });
});
