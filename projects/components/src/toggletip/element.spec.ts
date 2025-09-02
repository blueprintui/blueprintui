import { html } from 'lit';
import '@blueprintui/components/include/toggletip.js';
import { BpToggletip } from '@blueprintui/components/toggletip';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-toggletip', () => {
  let fixture: HTMLElement;
  let element: BpToggletip;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-toggletip>content</bp-toggletip>`);
    element = fixture.querySelector<BpToggletip>('bp-toggletip');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-toggletip')).toBe(BpToggletip);
  });

  it('should default to position top', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('top');
  });

  it('should default role tooltip', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('tooltip');
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.open).toBe(false);
    expect(element.position).toBe('top');
    expect(element.anchor).toBeUndefined();
    expect(element.i18n).toBeDefined();
  });

  it('should reflect open property to attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('open')).toBeNull();

    element.open = true;
    await elementIsStable(element);
    expect(element.getAttribute('open')).toBe('');

    element.open = false;
    await elementIsStable(element);
    expect(element.getAttribute('open')).toBeNull();
  });

  it('should reflect position property to attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('position')).toBe('top');

    element.position = 'bottom';
    await elementIsStable(element);
    expect(element.getAttribute('position')).toBe('bottom');

    element.position = 'left';
    await elementIsStable(element);
    expect(element.getAttribute('position')).toBe('left');

    element.position = 'right';
    await elementIsStable(element);
    expect(element.getAttribute('position')).toBe('right');
  });

  it('should support closable property', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);

    element.closable = true;
    await elementIsStable(element);
    expect(element.closable).toBe(true);
  });

  it('should support anchor property', async () => {
    await elementIsStable(element);
    expect(element.anchor).toBeUndefined();

    const anchorElement = document.createElement('button');
    element.anchor = anchorElement;
    await elementIsStable(element);
    expect(element.anchor).toBe(anchorElement);

    element.anchor = 'button';
    await elementIsStable(element);
    expect(element.anchor).toBe('button');
  });

  it('should support i18n property', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(element.i18n.close).toBeDefined();

    const customI18n = { close: 'Custom Close' };
    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.close).toBe('Custom Close');
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    const arrowPart = element.shadowRoot.querySelector('[part="arrow"]');

    expect(internalPart).toBeTruthy();
    expect(arrowPart).toBeTruthy();
  });

  it('should render default slot content', async () => {
    await elementIsStable(element);
    const slot = element.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();
    expect(element.innerText).toBe('content');
  });

  it('should render footer slot', async () => {
    await elementIsStable(element);
    const footerSlot = element.shadowRoot.querySelector('slot[name="footer"]');
    expect(footerSlot).toBeTruthy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--padding', '1rem');
    element.style.setProperty('--background', 'blue');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--width', '200px');
    element.style.setProperty('--height', '100px');
    element.style.setProperty('--min-width', '150px');
    element.style.setProperty('--min-height', '50px');
    element.style.setProperty('--font-size', '14px');
    element.style.setProperty('--filter', 'blur(1px)');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--padding')).toBe('1rem');
    expect(element.style.getPropertyValue('--background')).toBe('blue');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--width')).toBe('200px');
    expect(element.style.getPropertyValue('--height')).toBe('100px');
    expect(element.style.getPropertyValue('--min-width')).toBe('150px');
    expect(element.style.getPropertyValue('--min-height')).toBe('50px');
    expect(element.style.getPropertyValue('--font-size')).toBe('14px');
    expect(element.style.getPropertyValue('--filter')).toBe('blur(1px)');
  });

  it('should have internal element with correct id', async () => {
    await elementIsStable(element);
    const internalElement = element.shadowRoot.querySelector('#internal');
    expect(internalElement).toBeTruthy();
    expect(internalElement.getAttribute('part')).toBe('internal');
  });
});
