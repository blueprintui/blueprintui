import { html } from 'lit';
import '@blueprintui/components/include/button-icon.js';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button-icon element', () => {
  let fixture: HTMLElement;
  let element: BpButtonIcon;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-icon>button action</bp-button-icon>`);
    element = fixture.querySelector<BpButtonIcon>('bp-button-icon');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('button action');
  });

  it('should default to placeholder icon', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('ellipsis-vertical');
  });

  it('should support custom icon shapes', async () => {
    element.shape = 'test';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('test');
  });

  it('should set solid state icon if pressed', async () => {
    element.pressed = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').type).toBe('solid');
  });

  it('should set solid state icon if expanded', async () => {
    element.expanded = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').type).toBe('solid');
  });

  it('should support direction property', async () => {
    element.direction = 'up';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').direction).toBe('up');
  });

  it('should reflect direction attribute', async () => {
    element.direction = 'down';
    await elementIsStable(element);
    expect(element.getAttribute('direction')).toBe('down');
  });

  it('should have default i18n configuration', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
  });

  it('should support custom i18n configuration', async () => {
    const customI18n = { label: 'Custom Label' };
    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.label).toBe('Custom Label');
  });

  it('should provide icon getter access', async () => {
    await elementIsStable(element);
    expect(element.icon).toBe(element.shadowRoot.querySelector('bp-icon'));
  });

  it('should set bp-button-icon attribute in connectedCallback', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('bp-button-icon')).toBe(true);
  });

  it('should handle readonly state in updated lifecycle', async () => {
    await elementIsStable(element);
    element.readonly = true;
    await elementIsStable(element);
    expect(element._internals.ariaHidden).toBe('true');
  });

  it('should not set aria-hidden when readonly but has aria-label', async () => {
    await elementIsStable(element);
    element.readonly = true;
    element._internals.ariaLabel = 'Test Label';
    await elementIsStable(element);
    expect(element._internals.ariaHidden).toBe(null);
  });

  it('should render slot content when provided', async () => {
    fixture = await createFixture(html`<bp-button-icon><span>Custom Content</span></bp-button-icon>`);
    element = fixture.querySelector<BpButtonIcon>('bp-button-icon');
    await elementIsStable(element);
    expect(element.querySelector('span').textContent).toBe('Custom Content');
  });

  it('should have correct CSS parts', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part="internal"]')).toBeTruthy();
    expect(element.shadowRoot.querySelector('[part="icon"]')).toBeTruthy();
  });

  it('should inherit button styles', async () => {
    await elementIsStable(element);
    expect(BpButtonIcon.styles).toBeDefined();
    expect(Array.isArray(BpButtonIcon.styles)).toBe(true);
  });
});
