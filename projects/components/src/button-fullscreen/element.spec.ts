import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { BpButtonFullscreen } from '@blueprintui/components/button-fullscreen';
import '@blueprintui/components/include/button-fullscreen.js';
import '@blueprintui/icons/shapes/fullscreen.js';
import '@blueprintui/icons/shapes/fullscreen-exit.js';

describe('bp-button-fullscreen', () => {
  let element: BpButtonFullscreen;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <div id="test-container">
        <bp-button-fullscreen aria-label="enter fullscreen"></bp-button-fullscreen>
      </div>
    `);
    element = fixture.querySelector<BpButtonFullscreen>('bp-button-fullscreen');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should have default property values', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(false);
    expect(element.disabled).toBe(false);
    expect(element.readonly).toBe(false);
    expect(element.value).toBe('on');
    expect(element.target).toBeUndefined();
    expect(element.name).toBeUndefined();
  });

  it('should update :state(checked) state when checked property changes', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(checked)')).toBe(false);

    element.checked = true;
    await elementIsStable(element);
    expect(element.matches(':state(checked)')).toBe(true);

    element.checked = false;
    await elementIsStable(element);
    expect(element.matches(':state(checked)')).toBe(false);
  });

  it('should update aria-pressed when checked state changes', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('false');

    element.checked = true;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('true');

    element.checked = false;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('false');
  });

  it('should render fullscreen icon when unchecked', async () => {
    element.checked = false;
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon?.shape).toBe('fullscreen');
  });

  it('should render fullscreen-exit icon when checked', async () => {
    element.checked = true;
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon?.shape).toBe('fullscreen-exit');
  });

  it('should support disabled state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(true);
    expect(element.tabIndex).toBe(-1);

    const button = element.shadowRoot.querySelector('button');
    expect(button?.disabled).toBe(true);
  });

  it('should support readonly state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(false);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(true);
    expect(element.tabIndex).toBe(0); // readonly elements are still focusable
  });

  it('should not toggle when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);

    const initialChecked = element.checked;
    emulateClick(element.shadowRoot.querySelector('button'));
    await elementIsStable(element);

    expect(element.checked).toBe(initialChecked);
  });

  it('should not toggle when readonly', async () => {
    element.readonly = true;
    await elementIsStable(element);

    const initialChecked = element.checked;
    emulateClick(element.shadowRoot.querySelector('button'));
    await elementIsStable(element);

    expect(element.checked).toBe(initialChecked);
  });

  it('should have role="button"', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('button');
  });

  it('should be focusable', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should support public focus() method', async () => {
    await elementIsStable(element);
    element.focus();
    const button = element.shadowRoot.querySelector('button');
    expect(document.activeElement).toBe(element);
  });

  it('should support public blur() method', async () => {
    await elementIsStable(element);
    element.focus();
    element.blur();
    expect(document.activeElement).not.toBe(element);
  });

  it('should support public click() method', async () => {
    await elementIsStable(element);
    const button = element.shadowRoot.querySelector('button');
    spyOn(button, 'click');
    element.click();
    expect(button.click).toHaveBeenCalled();
  });

  it('should support target property', async () => {
    element.target = 'test-container';
    await elementIsStable(element);
    expect(element.target).toBe('test-container');
  });

  it('should support custom value', async () => {
    element.value = 'fullscreen';
    await elementIsStable(element);
    expect(element.value).toBe('fullscreen');
  });

  it('should have correct CSS parts', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part="button"]')).toBeTruthy();
    expect(element.shadowRoot.querySelector('[part="icon"]')).toBeTruthy();
  });

  it('should render slot content when provided', async () => {
    fixture = await createFixture(html`
      <bp-button-fullscreen aria-label="fullscreen">
        <span>Custom Icon</span>
      </bp-button-fullscreen>
    `);
    element = fixture.querySelector<BpButtonFullscreen>('bp-button-fullscreen');
    await elementIsStable(element);
    expect(element.querySelector('span')?.textContent).toBe('Custom Icon');
  });

  describe('form participation', () => {
    let form: HTMLFormElement;
    let button: HTMLButtonElement;

    beforeEach(async () => {
      fixture = await createFixture(html`
        <form>
          <bp-button-fullscreen name="fullscreen-mode" aria-label="enter fullscreen"></bp-button-fullscreen>
          <button type="submit">submit</button>
        </form>
      `);

      form = fixture.querySelector('form');
      button = fixture.querySelector('button[type="submit"]');
      element = fixture.querySelector<BpButtonFullscreen>('bp-button-fullscreen');
      form.addEventListener('submit', e => e.preventDefault());
    });

    it('should participate in form when name is provided', async () => {
      await elementIsStable(element);
      expect(element.name).toBe('fullscreen-mode');
    });

    it('should submit value when checked', async () => {
      element.checked = true;
      await elementIsStable(element);

      const event = onceEvent(form, 'submit');
      emulateClick(button);
      await event;

      const formData = new FormData(form);
      expect(formData.get('fullscreen-mode')).toBe('on');
    });

    it('should not submit value when unchecked', async () => {
      element.checked = false;
      await elementIsStable(element);

      const event = onceEvent(form, 'submit');
      emulateClick(button);
      await event;

      const formData = new FormData(form);
      expect(formData.has('fullscreen-mode')).toBe(false);
    });

    it('should submit custom value when provided', async () => {
      element.value = 'fullscreen';
      element.checked = true;
      await elementIsStable(element);

      const event = onceEvent(form, 'submit');
      emulateClick(button);
      await event;

      const formData = new FormData(form);
      expect(formData.get('fullscreen-mode')).toBe('fullscreen');
    });

    it('should update form value when checked state changes', async () => {
      await elementIsStable(element);

      element.checked = true;
      await elementIsStable(element);
      expect(new FormData(form).get('fullscreen-mode')).toBe('on');

      element.checked = false;
      await elementIsStable(element);
      expect(new FormData(form).has('fullscreen-mode')).toBe(false);
    });
  });

  describe('fullscreen API mocking', () => {
    let mockContainer: HTMLElement;
    let requestFullscreenSpy: jasmine.Spy;
    let exitFullscreenSpy: jasmine.Spy;

    beforeEach(async () => {
      fixture = await createFixture(html`
        <div id="mock-container">
          <bp-button-fullscreen target="mock-container" aria-label="enter fullscreen"></bp-button-fullscreen>
        </div>
      `);
      element = fixture.querySelector<BpButtonFullscreen>('bp-button-fullscreen');
      mockContainer = fixture.querySelector('#mock-container');

      // Mock fullscreen API
      requestFullscreenSpy = jasmine
        .createSpy('requestFullscreen')
        .and.returnValue(Promise.resolve());
      exitFullscreenSpy = jasmine
        .createSpy('exitFullscreen')
        .and.returnValue(Promise.resolve());

      mockContainer.requestFullscreen = requestFullscreenSpy;
      (document as any).exitFullscreen = exitFullscreenSpy;
    });

    it('should call requestFullscreen when toggled to checked', async () => {
      await elementIsStable(element);
      expect(element.checked).toBe(false);

      const button = element.shadowRoot.querySelector('button');
      emulateClick(button);
      await elementIsStable(element);

      expect(requestFullscreenSpy).toHaveBeenCalled();
    });

    it('should call exitFullscreen when toggled to unchecked', async () => {
      element.checked = true;
      await elementIsStable(element);

      const button = element.shadowRoot.querySelector('button');
      emulateClick(button);
      await elementIsStable(element);

      expect(exitFullscreenSpy).toHaveBeenCalled();
    });

    it('should fire input event before state change', async () => {
      await elementIsStable(element);
      const inputSpy = jasmine.createSpy('input');
      element.addEventListener('input', inputSpy);

      const button = element.shadowRoot.querySelector('button');
      emulateClick(button);

      // Input event should fire
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(inputSpy).toHaveBeenCalled();
    });

    it('should fire change event after state change', async () => {
      await elementIsStable(element);
      const changeSpy = jasmine.createSpy('change');
      element.addEventListener('change', changeSpy);

      const button = element.shadowRoot.querySelector('button');
      emulateClick(button);
      await elementIsStable(element);

      expect(changeSpy).toHaveBeenCalled();
    });

    it('should handle fullscreen API errors gracefully', async () => {
      requestFullscreenSpy.and.returnValue(Promise.reject(new Error('Fullscreen not allowed')));
      await elementIsStable(element);

      const initialChecked = element.checked;
      const button = element.shadowRoot.querySelector('button');
      emulateClick(button);
      await elementIsStable(element);

      // Wait for promise rejection
      await new Promise(resolve => setTimeout(resolve, 100));

      // State should not change if fullscreen fails
      expect(element.checked).toBe(initialChecked);
    });
  });

  describe('keyboard interaction', () => {
    it('should toggle on Space key', async () => {
      await elementIsStable(element);
      const button = element.shadowRoot.querySelector('button');

      // Mock fullscreen API
      const mockContainer = document.createElement('div');
      mockContainer.id = 'keyboard-test';
      mockContainer.requestFullscreen = jasmine.createSpy('requestFullscreen').and.returnValue(Promise.resolve());
      document.body.appendChild(mockContainer);
      mockContainer.appendChild(element);
      element.target = 'keyboard-test';
      await elementIsStable(element);

      expect(element.checked).toBe(false);

      button.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
      await elementIsStable(element);
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockContainer.requestFullscreen).toHaveBeenCalled();

      document.body.removeChild(mockContainer);
    });

    it('should toggle on Enter key', async () => {
      await elementIsStable(element);
      const button = element.shadowRoot.querySelector('button');

      // Mock fullscreen API
      const mockContainer = document.createElement('div');
      mockContainer.id = 'keyboard-test-2';
      mockContainer.requestFullscreen = jasmine.createSpy('requestFullscreen').and.returnValue(Promise.resolve());
      document.body.appendChild(mockContainer);
      mockContainer.appendChild(element);
      element.target = 'keyboard-test-2';
      await elementIsStable(element);

      expect(element.checked).toBe(false);

      button.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter', bubbles: true }));
      await elementIsStable(element);
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockContainer.requestFullscreen).toHaveBeenCalled();

      document.body.removeChild(mockContainer);
    });

    it('should not toggle on other keys', async () => {
      await elementIsStable(element);
      const button = element.shadowRoot.querySelector('button');
      const initialChecked = element.checked;

      button.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA', bubbles: true }));
      await elementIsStable(element);

      expect(element.checked).toBe(initialChecked);
    });

    it('should not toggle when disabled', async () => {
      element.disabled = true;
      await elementIsStable(element);
      const button = element.shadowRoot.querySelector('button');
      const initialChecked = element.checked;

      button.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
      await elementIsStable(element);

      expect(element.checked).toBe(initialChecked);
    });

    it('should not toggle when readonly', async () => {
      element.readonly = true;
      await elementIsStable(element);
      const button = element.shadowRoot.querySelector('button');
      const initialChecked = element.checked;

      button.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
      await elementIsStable(element);

      expect(element.checked).toBe(initialChecked);
    });
  });
});
