import { html } from 'lit';
import '@blueprintui/components/include/button-expand.js';
import { BpButtonExpand } from '@blueprintui/components/button-expand';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button-expand element', () => {
  let fixture: HTMLElement;
  let element: BpButtonExpand;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-expand name="expand"></bp-button-expand>`);
    element = fixture.querySelector<BpButtonExpand>('bp-button-expand');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-expand')).toBe(BpButtonExpand);
  });

  it('should set a default ariaLabel', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('expand');
  });

  it('should set role of switch', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('switch');
  });

  it('should default to vertical action', async () => {
    await elementIsStable(element);
    expect(element.orientation).toBe('vertical');
  });

  it('should display colapsed vertical angle icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.orientation).toBe('vertical');
    expect(icon.shape).toBe('angle');
    expect(icon.direction).toBe('right');
  });

  it('should display expanded vertical angle icon', async () => {
    element.checked = true;

    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.orientation).toBe('vertical');
    expect(icon.shape).toBe('angle');
    expect(icon.direction).toBe('down');
  });

  it('should display colapsed horizontal angle icon', async () => {
    element.orientation = 'horizontal';
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.orientation).toBe('horizontal');
    expect(icon.shape).toBe('angle');
    expect(icon.direction).toBe('right');
  });

  it('should display expanded horizontal angle icon', async () => {
    element.orientation = 'horizontal';
    element.checked = true;

    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.orientation).toBe('horizontal');
    expect(icon.shape).toBe('angle');
    expect(icon.direction).toBe('left');
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

    element.readOnly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should have default value of "on"', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('on');
  });

  it('should reflect value to attribute', async () => {
    await elementIsStable(element);

    element.value = 'custom';
    await elementIsStable(element);
    expect(element.getAttribute('value')).toBe('custom');
  });

  it('should have default i18n from I18nService', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(typeof element.i18n.expand).toBe('string');
  });

  it('should support custom i18n', async () => {
    const customI18n = { expand: 'Custom Expand Text' };
    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.expand).toBe('Custom Expand Text');
  });

  it('should support custom slot content', async () => {
    // Clear existing content and add custom icon
    element.innerHTML = '<bp-icon shape="chevron" size="sm"></bp-icon>';
    await elementIsStable(element);

    const slot = element.shadowRoot.querySelector('slot');
    const assignedElements = slot.assignedElements();

    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].tagName.toLowerCase()).toBe('bp-icon');
    expect(assignedElements[0].getAttribute('shape')).toBe('chevron');
  });

  it('should be form associated', async () => {
    await elementIsStable(element);
    expect(element._internals.form).toBeNull(); // No form in test fixture
    expect(BpButtonExpand.formAssociated).toBe(true);
  });

  it('should have name property', async () => {
    await elementIsStable(element);
    expect(element.name).toBe('expand');
  });

  it('should have correct icon properties', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(icon.getAttribute('role')).toBe('presentation');
    expect(icon.getAttribute('shape')).toBe('angle');
    expect(icon.getAttribute('size')).toBe('sm');
  });

  it('should handle invalid orientation gracefully', async () => {
    // @ts-expect-error - testing invalid value
    element.orientation = 'invalid';
    await elementIsStable(element);

    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.direction).toBeNull();
  });
});
