import { html } from 'lit';
import '@blueprintui/components/include/accordion.js';
import { BpAccordionHeader } from '@blueprintui/components/accordion';
import { elementIsStable, createFixture, removeFixture, emulateClick } from '@blueprintui/test';

describe('accordion header element', () => {
  let fixture: HTMLElement;
  let element: BpAccordionHeader;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-accordion-header>hello there</bp-accordion-header>`);
    element = fixture.querySelector<BpAccordionHeader>('bp-accordion-header');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('hello there');
  });

  it('should set a default slot content "accordion-header"', async () => {
    await elementIsStable(element);
    expect(element.slot).toBe('accordion-header');
    expect(element.getAttribute('slot')).toBe('accordion-header');
  });

  it('should set a default id', async () => {
    await elementIsStable(element);
    expect(element.id).toBeTruthy();
  });

  it('should use provided id if available', async () => {
    element.id = 'test';
    await elementIsStable(element);
    expect(element.id).toBe('test');
  });

  it('should set visual expand state for button', async () => {
    await elementIsStable(element);
    const expandButton = element.shadowRoot.querySelector('bp-button-expand');

    expect(element.expanded).toBe(false);
    expect(expandButton.checked).toBe(false);
    expect(expandButton.readonly).toBe(true);
    expect(expandButton.orientation).toBe('vertical');

    element.expanded = true;
    await elementIsStable(element);

    expect(element.expanded).toBe(true);
    expect(expandButton.checked).toBe(true);
  });

  it('should set the appropriate aria-expanded state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaExpanded).toBe('false');

    element.expanded = true;
    await element.updateComplete;
    expect(element._internals.ariaExpanded).toBe('true');
  });

  it('should have form association enabled', async () => {
    await elementIsStable(element);
    expect(BpAccordionHeader.formAssociated).toBe(true);
  });

  it('should support inherited BaseButton properties', async () => {
    await elementIsStable(element);

    // Test disabled property
    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    expect(element.matches(':state(disabled)')).toBe(true);
    expect(element._internals.ariaDisabled).toBe('true');

    // Test readonly property
    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);
    expect(element.matches(':state(readonly)')).toBe(true);

    // Test pressed property
    element.pressed = true;
    await elementIsStable(element);
    expect(element.pressed).toBe(true);

    // Test selected property
    element.selected = true;
    await elementIsStable(element);
    expect(element.selected).toBe(true);
    expect(element.matches(':state(selected)')).toBe(true);

    // Test type property
    element.type = 'submit';
    await elementIsStable(element);
    expect(element.type).toBe('submit');
    expect(element.getAttribute('type')).toBe('submit');

    // Test name property
    element.name = 'test-name';
    await elementIsStable(element);
    expect(element.name).toBe('test-name');
    expect(element.getAttribute('name')).toBe('test-name');

    // Test value property
    element.value = 'test-value';
    await elementIsStable(element);
    expect(element.value).toBe('test-value');
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);

    // Should have button role (inherited from BaseButton)
    expect(element._internals.role).toBe('button');

    // Should be focusable when not disabled
    expect(element.tabIndex).toBe(0);

    // Should not be focusable when disabled
    element.disabled = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);
  });

  it('should handle click interactions', async () => {
    await elementIsStable(element);

    // Test that click events are handled (inherited from BaseButton)
    const clickSpy = jasmine.createSpy('click');
    element.addEventListener('click', clickSpy);

    await emulateClick(element);
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should maintain button expand readonly state', async () => {
    await elementIsStable(element);
    const expandButton = element.shadowRoot.querySelector('bp-button-expand');

    // Button expand should always be readonly in accordion header
    expect(expandButton.readonly).toBe(true);

    // Changing element readonly state shouldn't affect button expand readonly
    element.readonly = true;
    await elementIsStable(element);
    expect(expandButton.readonly).toBe(true);
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    // Test that CSS custom properties can be set
    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--font-size', '16px');
    element.style.setProperty('--padding', '8px');

    await elementIsStable(element);

    // Verify properties are applied to the element
    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--font-size')).toBe('16px');
    expect(element.style.getPropertyValue('--padding')).toBe('8px');
  });

  it('should handle expanded state changes properly', async () => {
    await elementIsStable(element);

    // Initial state
    expect(element.expanded).toBe(false);
    expect(element._internals.ariaExpanded).toBe('false');

    // Change to expanded
    element.expanded = true;
    await elementIsStable(element);
    expect(element.expanded).toBe(true);
    expect(element._internals.ariaExpanded).toBe('true');

    // Change back to collapsed
    element.expanded = false;
    await elementIsStable(element);
    expect(element.expanded).toBe(false);
    expect(element._internals.ariaExpanded).toBe('false');
  });

  it('should have proper button expand orientation', async () => {
    await elementIsStable(element);
    const expandButton = element.shadowRoot.querySelector('bp-button-expand');

    // Should default to vertical orientation
    expect(expandButton.orientation).toBe('vertical');
  });
});
