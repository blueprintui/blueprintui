import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { BpSkeleton } from '@blueprintui/components/skeleton';
import '@blueprintui/components/include/skeleton.js';

describe('skeleton element', () => {
  let fixture: HTMLElement;
  let element: BpSkeleton;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-skeleton></bp-skeleton>`);
    element = fixture.querySelector<BpSkeleton>('bp-skeleton');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-skeleton')).toBe(BpSkeleton);
  });

  it('should have default property values', async () => {
    await elementIsStable(element);
    expect(element.effect).toBe(undefined);
    expect(element.shape).toBe(undefined);
  });

  it('should set effect property', async () => {
    element.effect = 'pulse';
    await elementIsStable(element);
    expect(element.effect).toBe('pulse');
    expect(element.hasAttribute('effect')).toBe(true);
    expect(element.getAttribute('effect')).toBe('pulse');
  });

  it('should set shape property', async () => {
    element.shape = 'circle';
    await elementIsStable(element);
    expect(element.shape).toBe('circle');
    expect(element.hasAttribute('shape')).toBe(true);
    expect(element.getAttribute('shape')).toBe('circle');
  });

  it('should update effect through attribute', async () => {
    element.setAttribute('effect', 'sheen');
    await elementIsStable(element);
    expect(element.effect).toBe('sheen');
  });

  it('should update shape through attribute', async () => {
    element.setAttribute('shape', 'circle');
    await elementIsStable(element);
    expect(element.shape).toBe('circle');
  });

  it('should have the internal part', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
  });

  it('should have presentation role', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('presentation');
  });

  it('should have aria-live polite', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLive).toBe('polite');
  });

  it('should have aria-label', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('Loading content');
  });
});
