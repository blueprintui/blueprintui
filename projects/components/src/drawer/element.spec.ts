import { html } from 'lit';
import '@blueprintui/components/include/drawer.js';
import { BpDrawer } from '@blueprintui/components/drawer';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';

describe('bp-drawer', () => {
  let fixture: HTMLElement;
  let element: BpDrawer;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-drawer>content</bp-drawer>`);
    element = fixture.querySelector<BpDrawer>('bp-drawer');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-drawer')).toBe(BpDrawer);
  });

  it('should default to closable to false (undefined)', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();
  });

  it('should default to position left', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('left');
  });

  it('should render close button when closable', async () => {
    element.closable = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeTruthy();
  });

  it('should dispatch a "toggle" event when the close button is clicked', async () => {
    element.closable = true;
    element.showPopover();
    await elementIsStable(element);

    const event = onceEvent(element, 'toggle');
    emulateClick(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon'));
    expect(await event).toBeTruthy();
  });

  it('should support right position', async () => {
    element.position = 'right';
    await elementIsStable(element);
    expect(element.position).toBe('right');
    expect(element.getAttribute('position')).toBe('right');
  });

  it('should reflect position attribute to DOM', async () => {
    element.setAttribute('position', 'right');
    await elementIsStable(element);
    expect(element.position).toBe('right');
  });

  it('should have default i18n property', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(element.i18n.close).toBeDefined();
  });

  it('should use custom i18n for close button aria-label', async () => {
    const customI18n = { close: 'Custom Close' };
    element.i18n = customI18n;
    element.closable = true;
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton.getAttribute('aria-label')).toBe('Custom Close');
  });

  it('should add bp-layer state to element internals', async () => {
    await elementIsStable(element);
    expect(element._internals.states.has('bp-layer')).toBe(true);
  });

  it('should render close button with correct attributes when closable', async () => {
    element.closable = true;
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton.getAttribute('shape')).toBe('close');
    expect(closeButton.getAttribute('action')).toBe('flat');
    expect(closeButton.getAttribute('type')).toBe('button');
  });

  it('should render slot content', async () => {
    await elementIsStable(element);
    const slot = element.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();
    expect(element.textContent.trim()).toBe('content');
  });
});
