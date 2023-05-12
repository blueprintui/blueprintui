import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpButton } from '@blueprintui/components/button';
import { BpFile } from '@blueprintui/components/file';
import '@blueprintui/components/include/file.js';

describe('bp-file', () => {
  let element: BpFile;
  let button: BpButton;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html` <bp-file></bp-file> `);

    element = fixture.querySelector<BpFile>('bp-file');
    button = element.shadowRoot.querySelector('bp-button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should disable button if file input is disabled', async () => {
    await elementIsStable(element);
    expect(button.disabled).toBe(undefined);

    element.setAttribute('disabled', '');
    await elementIsStable(element);
    expect(button.disabled).toBe(true);
  });

  it('clear action should not be visible if there are no files to clear', async () => {
    await elementIsStable(element);
    expect(element.files.length).toBe(0);
    expect(element.shadowRoot.querySelector('[shape=close]')).toBe(null);

    Object.defineProperty(element, 'inputControl', {
      get: () => ({ files: [{ name: 'test.png' }] }),
      configurable: true
    });
    element.requestUpdate();
    await elementIsStable(element);

    expect(element.files.length).toBe(1);
    expect(element.shadowRoot.querySelector('[shape=close]')).not.toBe(null);

    Object.defineProperty(element, 'inputControl', { get: () => ({ files: void 0 }) });
    element.requestUpdate();
    await elementIsStable(element);

    expect(element.files).toBe(undefined);
    expect(element.shadowRoot.querySelector('[shape=close]')).toBe(null);
  });

  it('should clear file input', async () => {
    element.dispatchEvent(new Event('change'));

    Object.defineProperty(element, 'inputControl', { get: () => ({ files: [{ name: 'test.png' }] }) });
    element.requestUpdate();
    await elementIsStable(element);

    element.shadowRoot.querySelector<any>('[shape=close]').click();
    await elementIsStable(element);
    expect(document.activeElement).toBe(element);
    expect(button.innerText.trim().toLocaleLowerCase()).toBe('browse');
  });
});
