import { html } from 'lit';
import '@blueprintui/components/include/button-play.js';
import { BpButtonPlay } from '@blueprintui/components/button-play';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button-play element', () => {
  let fixture: HTMLElement;
  let element: BpButtonPlay;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-play name="playback"></bp-button-play>`);
    element = fixture.querySelector<BpButtonPlay>('bp-button-play');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-play')).toBe(BpButtonPlay);
  });

  it('should set a default ariaLabel for play state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('play');
  });

  it('should update ariaLabel when checked changes to pause', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('play');

    element.checked = true;
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('pause');
  });

  it('should set role of button', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('button');
  });

  it('should set aria-pressed based on checked state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('false');

    element.checked = true;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('true');

    element.checked = false;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('false');
  });

  it('should display play icon when unchecked', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.checked).toBeFalsy();
    expect(icon.shape).toBe('play');
    expect(icon.size).toBe('sm');
  });

  it('should display pause icon when checked', async () => {
    element.checked = true;
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.checked).toBe(true);
    expect(icon.shape).toBe('pause');
    expect(icon.size).toBe('sm');
  });

  it('should not have a tabindex if readonly or disabled', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.disabled = true;
    await elementIsStable(element);
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);
  });

  it('should have default value of "on"', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('on');
  });

  it('should reflect value to attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('value')).toBe('on');

    element.value = 'playing';
    await elementIsStable(element);
    expect(element.getAttribute('value')).toBe('playing');
  });

  it('should have default i18n from I18nService', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(typeof element.i18n.play).toBe('string');
    expect(typeof element.i18n.pause).toBe('string');
  });

  it('should support custom i18n', async () => {
    const customI18n = { play: 'Start', pause: 'Stop' };
    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.play).toBe('Start');
    expect(element.i18n.pause).toBe('Stop');
  });

  it('should support custom slot content', async () => {
    element.innerHTML = '<bp-icon shape="play-circle" size="md"></bp-icon>';
    await elementIsStable(element);

    const slot = element.shadowRoot.querySelector('slot');
    const assignedElements = slot.assignedElements();

    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].tagName.toLowerCase()).toBe('bp-icon');
    expect(assignedElements[0].getAttribute('shape')).toBe('play-circle');
  });

  it('should be form associated', async () => {
    await elementIsStable(element);
    expect(element._internals.form).toBeNull(); // No form in test fixture
    expect(BpButtonPlay.formAssociated).toBe(true);
  });

  it('should have name property', async () => {
    await elementIsStable(element);
    expect(element.name).toBe('playback');
  });

  it('should support CSS states for disabled', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(true);
  });

  it('should support CSS states for readonly', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(false);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(true);
  });

  it('should toggle checked state on click', async () => {
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(true);

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(false);
  });

  it('should not change state when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();
  });

  it('should not change state when readonly', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();
  });

  it('should have correct icon part', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('[part="icon"]');
    expect(icon).toBeTruthy();
    expect(icon.tagName.toLowerCase()).toBe('bp-icon');
  });

  it('should have correct button part', async () => {
    await elementIsStable(element);
    const button = element.shadowRoot.querySelector('[part="button"]');
    expect(button).toBeTruthy();
  });

  it('should support custom value', async () => {
    element.value = 'custom-value';
    await elementIsStable(element);
    expect(element.value).toBe('custom-value');
    expect(element.getAttribute('value')).toBe('custom-value');
  });

  it('should not override custom aria-label', async () => {
    const customElement = await createFixture(html`<bp-button-play aria-label="custom label"></bp-button-play>`);
    const el = customElement.querySelector<BpButtonPlay>('bp-button-play');
    await elementIsStable(el);

    // Custom aria-label should be preserved
    expect(el.getAttribute('aria-label')).toBe('custom label');

    el.checked = true;
    await elementIsStable(el);

    // Custom aria-label should still be preserved after state change
    expect(el.getAttribute('aria-label')).toBe('custom label');

    removeFixture(customElement);
  });
});
