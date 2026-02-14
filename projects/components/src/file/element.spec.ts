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
    expect(button.disabled).toBe(false);

    element.setAttribute('disabled', '');
    await elementIsStable(element);
    expect(button.disabled).toBe(true);
  });

  it('clear action should not be visible if there are no files to clear', async () => {
    await elementIsStable(element);
    expect(element.files.length).toBe(0);
    expect(element.shadowRoot.querySelector('[shape=close]')).toBe(null);

    Object.defineProperty(element, 'input', {
      get: () => ({ files: [{ name: 'test.png' }] }),
      configurable: true
    });
    element.requestUpdate();
    await elementIsStable(element);

    expect(element.files.length).toBe(1);
    expect(element.shadowRoot.querySelector('[shape=close]')).not.toBe(null);

    Object.defineProperty(element, 'input', { get: () => ({ files: void 0 }) });
    element.requestUpdate();
    await elementIsStable(element);

    expect(element.files).toBe(undefined);
    expect(element.shadowRoot.querySelector('[shape=close]')).toBe(null);
  });

  it('should clear file input', async () => {
    element.dispatchEvent(new Event('change'));

    Object.defineProperty(element, 'input', { get: () => ({ files: [{ name: 'test.png' }] }) });
    element.requestUpdate();
    await elementIsStable(element);

    element.shadowRoot.querySelector<any>('[shape=close]').click();
    await elementIsStable(element);
    expect(document.activeElement).toBe(element);
    expect(button.innerText.trim().toLocaleLowerCase()).toBe('browse');
  });

  it('should set accept property', async () => {
    element.accept = 'image/*,.pdf';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.accept).toBe('image/*,.pdf');
  });

  it('should set multiple property', async () => {
    element.multiple = true;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.multiple).toBe(true);
  });

  it('should call showPicker when button is clicked', async () => {
    const showPickerSpy = spyOn(element.input, 'showPicker');

    button.click();

    expect(showPickerSpy).toHaveBeenCalled();
  });

  it('should have proper accessibility attributes on close button', async () => {
    Object.defineProperty(element, 'input', {
      get: () => ({ files: [{ name: 'test.png' }] }),
      configurable: true
    });
    element.requestUpdate();
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('[shape=close]');
    expect(closeButton.getAttribute('aria-label')).toBe('remove file');
  });

  it('should not show close button when disabled', async () => {
    element.setAttribute('disabled', '');
    Object.defineProperty(element, 'input', {
      get: () => ({ files: [{ name: 'test.png' }] }),
      configurable: true
    });
    element.requestUpdate();
    await elementIsStable(element);

    // Close button should be hidden when disabled
    const closeButton = element.shadowRoot.querySelector('[shape=close]');
    expect(closeButton).toBeFalsy();
    expect(element.disabled).toBe(true);
  });

  it('should focus browse button after clearing files', async () => {
    Object.defineProperty(element, 'input', {
      get: () => ({ files: [{ name: 'test.png' }] }),
      configurable: true
    });
    element.requestUpdate();
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('[shape=close]') as HTMLElement;
    closeButton.click();
    await elementIsStable(element);

    expect(document.activeElement).toBe(element);
  });

  it('should reset button label to browse when clearing files', async () => {
    Object.defineProperty(element, 'input', {
      get: () => ({ files: [{ name: 'test.png' }] }),
      configurable: true
    });
    element.requestUpdate();
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('[shape=close]') as HTMLElement;
    closeButton.click();
    await elementIsStable(element);

    const buttonText = button.querySelector('span').textContent;
    expect(buttonText).toBe('browse');
  });

  it('should dispatch change event when clearing files', async () => {
    const dispatchEventSpy = spyOn(element.input, 'dispatchEvent');
    Object.defineProperty(element, 'input', {
      get: () => ({ files: [{ name: 'test.png' }], value: 'test', dispatchEvent: dispatchEventSpy }),
      configurable: true
    });
    element.requestUpdate();
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('[shape=close]') as HTMLElement;
    closeButton.click();
    await elementIsStable(element);

    expect(dispatchEventSpy).toHaveBeenCalledWith(jasmine.any(Event));
  });

  it('should handle i18n property', async () => {
    const customI18n = {
      browse: 'Select Files',
      files: 'selected files',
      removeFile: 'Remove selected file',
      sort: 'sort',
      none: 'none',
      ascending: 'ascending',
      descending: 'descending',
      expand: 'expand',
      close: 'close',
      resize: 'resize',
      filter: 'filter',
      loading: 'loading',
      show: 'show',
      hide: 'hide',
      previous: 'previous',
      next: 'next',
      first: 'first',
      last: 'last',
      today: 'today',
      resizeColumn: 'resize column',
      closeDetails: 'close details',
      noData: 'no results found',
      action: 'action',
      dropTarget: 'drop item',
      firstPage: 'go to first page',
      previousPage: 'go to previous page',
      nextPage: 'go to next page',
      lastPage: 'go to last page',
      pageSize: 'items per page'
    };

    element.i18n = customI18n;
    await elementIsStable(element);

    expect(element.i18n.browse).toBe('Select Files');
    expect(element.i18n.files).toBe('selected files');
    expect(element.i18n.removeFile).toBe('Remove selected file');
  });

  it('should render folder icon in button', async () => {
    await elementIsStable(element);

    const icon = button.querySelector('bp-icon');
    expect(icon.shape).toBe('folder');
    expect(icon.size).toBe('sm');
  });

  it('should have correct button properties', async () => {
    await elementIsStable(element);

    expect(button.action).toBe('secondary');
  });

  it('should have hidden file input', async () => {
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.type).toBe('file');
    expect(input.hidden).toBe(true);
  });

  it('should sync multiple property with input', async () => {
    element.multiple = true;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.multiple).toBe(true);

    element.multiple = false;
    await elementIsStable(element);
    expect(input.multiple).toBe(false);
  });

  it('should sync accept property with input', async () => {
    element.accept = 'image/*';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.accept).toBe('image/*');

    element.accept = '.pdf,.doc';
    await elementIsStable(element);
    expect(input.accept).toBe('.pdf,.doc');
  });

  it('should handle form control inheritance', async () => {
    await elementIsStable(element);

    expect(element._internals).toBeDefined();
  });

  it('should have proper CSS states', async () => {
    await elementIsStable(element);

    expect(element.matches(':state(disabled)')).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
  });

  it('should handle multiple file selection', async () => {
    element.multiple = true;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.multiple).toBe(true);
  });

  it('should have proper button structure', async () => {
    await elementIsStable(element);

    const buttonContainer = element.shadowRoot.querySelector('.file-input');
    expect(buttonContainer).toBeTruthy();

    const buttonElement = buttonContainer.querySelector('bp-button');
    expect(buttonElement).toBeTruthy();

    const icon = buttonElement.querySelector('bp-icon');
    expect(icon).toBeTruthy();

    const span = buttonElement.querySelector('span');
    expect(span).toBeTruthy();
  });
});
